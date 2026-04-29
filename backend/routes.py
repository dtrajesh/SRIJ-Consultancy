from functools import wraps
import os
import uuid

from flask import Blueprint, current_app, jsonify, request, send_from_directory
from itsdangerous import BadSignature, URLSafeSerializer
from werkzeug.utils import secure_filename

from models import (
    ConsultationRequest,
    ContactSubmission,
    HrContact,
    Industry,
    JobApplication,
    JobOpening,
    Service,
    TalentProfileSubmission,
    Testimonial,
    db,
)

api = Blueprint("api", __name__, url_prefix="/api")


def missing_fields(payload, required_fields):
    return [field for field in required_fields if not str(payload.get(field, "")).strip()]


def allowed_resume(filename):
    extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    return extension in {"pdf", "doc", "docx"}


def remove_resume_file(file_name):
    if not file_name:
        return

    resume_path = os.path.join(current_app.config["UPLOAD_FOLDER"], file_name)
    if not os.path.exists(resume_path):
        return

    try:
        os.remove(resume_path)
    except OSError:
        current_app.logger.warning("Could not delete resume file: %s", resume_path)


def serialize_job(job):
    return {
        "id": job.id,
        "job_category": job.job_category,
        "title": job.title,
        "department": job.department,
        "location": job.location,
        "employment_type": job.employment_type,
        "summary": job.summary,
        "responsibilities": job.responsibilities,
        "requirements": job.requirements,
        "is_active": job.is_active,
        "created_at": job.created_at.isoformat(),
    }


def serialize_talent_submission(item):
    return {
        "id": item.id,
        "submission_type": item.submission_type,
        "target_job_title": item.target_job_title,
        "full_name": item.full_name,
        "email": item.email,
        "phone": item.phone,
        "current_location": item.current_location,
        "current_company": item.current_company,
        "years_of_experience": item.years_of_experience,
        "linkedin_url": item.linkedin_url,
        "portfolio_url": item.portfolio_url,
        "employment_preference": item.employment_preference,
        "preferred_work_mode": item.preferred_work_mode,
        "notice_period": item.notice_period,
        "work_authorization": item.work_authorization,
        "primary_skills": item.primary_skills,
        "professional_summary": item.professional_summary,
        "resume_original_name": item.resume_original_name,
        "created_at": item.created_at.isoformat(),
    }


def admin_serializer():
    return URLSafeSerializer(current_app.config["SECRET_KEY"], salt="admin-auth")


def issue_admin_token(username):
    return admin_serializer().dumps({"username": username, "role": "admin"})


def verify_admin_token(token):
    return admin_serializer().loads(token)


def admin_required(view_func):
    @wraps(view_func)
    def wrapped(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"message": "Admin authentication required."}), 401

        token = auth_header.split(" ", 1)[1].strip()
        if not token:
            return jsonify({"message": "Admin authentication required."}), 401

        try:
            payload = verify_admin_token(token)
        except BadSignature:
            return jsonify({"message": "Invalid or expired admin token."}), 401

        request.admin_user = payload
        return view_func(*args, **kwargs)

    return wrapped


@api.get("/health")
def health_check():
    return jsonify({"status": "ok"})


@api.get("/careers/jobs")
def get_public_jobs():
    jobs = (
        JobOpening.query.filter_by(is_active=True, job_category="public")
        .order_by(JobOpening.created_at.desc())
        .all()
    )
    return jsonify([serialize_job(job) for job in jobs])


@api.get("/careers/internal/jobs")
def get_internal_jobs():
    jobs = (
        JobOpening.query.filter_by(is_active=True, job_category="internal")
        .order_by(JobOpening.created_at.desc())
        .all()
    )
    return jsonify([serialize_job(job) for job in jobs])


@api.get("/careers/jobs/<int:job_id>")
def get_public_job(job_id):
    job = JobOpening.query.filter_by(id=job_id, is_active=True, job_category="public").first()

    if job is None:
        return jsonify({"message": "Job opening not found."}), 404

    return jsonify(serialize_job(job))


@api.post("/careers/jobs/<int:job_id>/apply")
def apply_to_job(job_id):
    job = JobOpening.query.filter_by(id=job_id, is_active=True, job_category="public").first()

    if job is None:
        return jsonify({"message": "Job opening not found."}), 404

    form = request.form
    required_fields = ["full_name", "email", "phone"]
    missing = [field for field in required_fields if not str(form.get(field, "")).strip()]

    resume = request.files.get("resume")
    if missing:
        return jsonify({"message": f"Missing required fields: {', '.join(missing)}"}), 400

    if resume is None or not resume.filename:
        return jsonify({"message": "Resume upload is required."}), 400

    if not allowed_resume(resume.filename):
        return jsonify({"message": "Resume must be a PDF, DOC, or DOCX file."}), 400

    original_name = secure_filename(resume.filename)
    extension = original_name.rsplit(".", 1)[-1].lower()
    stored_name = f"{uuid.uuid4().hex}.{extension}"
    upload_path = os.path.join(current_app.config["UPLOAD_FOLDER"], stored_name)
    resume.save(upload_path)

    application = JobApplication(
        job_id=job.id,
        job_title=job.title,
        full_name=form["full_name"].strip(),
        email=form["email"].strip(),
        phone=form["phone"].strip(),
        current_company=form.get("current_company", "").strip(),
        years_of_experience=form.get("years_of_experience", "").strip(),
        linkedin_url=form.get("linkedin_url", "").strip(),
        cover_letter=form.get("cover_letter", "").strip(),
        resume_file_name=stored_name,
        resume_original_name=original_name,
    )
    db.session.add(application)
    db.session.commit()

    return jsonify({"message": "Application submitted successfully."}), 201


@api.post("/careers/talent/submit")
def submit_talent_profile():
    form = request.form
    required_fields = [
        "submission_type",
        "target_job_title",
        "full_name",
        "email",
        "phone",
        "current_location",
        "years_of_experience",
        "employment_preference",
        "preferred_work_mode",
        "work_authorization",
        "primary_skills",
        "professional_summary",
    ]
    missing = [field for field in required_fields if not str(form.get(field, "")).strip()]

    resume = request.files.get("resume")
    if missing:
        return jsonify({"message": f"Missing required fields: {', '.join(missing)}"}), 400

    if resume is None or not resume.filename:
        return jsonify({"message": "Resume upload is required."}), 400

    if not allowed_resume(resume.filename):
        return jsonify({"message": "Resume must be a PDF, DOC, or DOCX file."}), 400

    original_name = secure_filename(resume.filename)
    extension = original_name.rsplit(".", 1)[-1].lower()
    stored_name = f"{uuid.uuid4().hex}.{extension}"
    upload_path = os.path.join(current_app.config["UPLOAD_FOLDER"], stored_name)
    resume.save(upload_path)

    submission = TalentProfileSubmission(
        submission_type=form["submission_type"].strip(),
        target_job_title=form["target_job_title"].strip(),
        full_name=form["full_name"].strip(),
        email=form["email"].strip(),
        phone=form["phone"].strip(),
        current_location=form["current_location"].strip(),
        current_company=form.get("current_company", "").strip(),
        years_of_experience=form["years_of_experience"].strip(),
        linkedin_url=form.get("linkedin_url", "").strip(),
        portfolio_url=form.get("portfolio_url", "").strip(),
        employment_preference=form["employment_preference"].strip(),
        preferred_work_mode=form["preferred_work_mode"].strip(),
        notice_period=form.get("notice_period", "").strip(),
        work_authorization=form["work_authorization"].strip(),
        primary_skills=form["primary_skills"].strip(),
        professional_summary=form["professional_summary"].strip(),
        resume_file_name=stored_name,
        resume_original_name=original_name,
    )
    db.session.add(submission)
    db.session.commit()

    return jsonify({"message": "Your profile has been submitted successfully."}), 201


@api.post("/admin/login")
def admin_login():
    payload = request.get_json(silent=True) or {}
    required_fields = ["username", "password"]
    missing = missing_fields(payload, required_fields)

    if missing:
        return jsonify({"message": f"Missing required fields: {', '.join(missing)}"}), 400

    username = payload["username"].strip()
    password = payload["password"].strip()

    if (
        username != current_app.config["ADMIN_USERNAME"]
        or password != current_app.config["ADMIN_PASSWORD"]
    ):
        return jsonify({"message": "Invalid admin credentials."}), 401

    return jsonify(
        {
            "message": "Admin login successful.",
            "token": issue_admin_token(username),
            "username": username,
        }
    )


@api.get("/admin/submissions")
@admin_required
def admin_submissions():
    contacts = ContactSubmission.query.order_by(ContactSubmission.created_at.desc()).all()
    consultations = ConsultationRequest.query.order_by(
        ConsultationRequest.created_at.desc()
    ).all()
    jobs = JobOpening.query.order_by(JobOpening.created_at.desc()).all()
    applications = JobApplication.query.order_by(JobApplication.created_at.desc()).all()
    talent_submissions = TalentProfileSubmission.query.order_by(
        TalentProfileSubmission.created_at.desc()
    ).all()

    return jsonify(
        {
            "contacts": [
                {
                    "id": item.id,
                    "name": item.name,
                    "email": item.email,
                    "company": item.company,
                    "phone": item.phone,
                    "message": item.message,
                    "created_at": item.created_at.isoformat(),
                }
                for item in contacts
            ],
            "consultations": [
                {
                    "id": item.id,
                    "name": item.name,
                    "email": item.email,
                    "company": item.company,
                    "need_type": item.need_type,
                    "timeline": item.timeline,
                    "team_size": item.team_size,
                    "goals": item.goals,
                    "created_at": item.created_at.isoformat(),
                }
                for item in consultations
            ],
            "jobs": [
                {
                    **serialize_job(item),
                    "application_count": len(item.applications),
                }
                for item in jobs
            ],
            "applications": [
                {
                    "id": item.id,
                    "job_id": item.job_id,
                    "job_title": item.job.title if item.job else item.job_title,
                    "full_name": item.full_name,
                    "email": item.email,
                    "phone": item.phone,
                    "current_company": item.current_company,
                    "years_of_experience": item.years_of_experience,
                    "linkedin_url": item.linkedin_url,
                    "cover_letter": item.cover_letter,
                    "resume_original_name": item.resume_original_name,
                    "created_at": item.created_at.isoformat(),
                }
                for item in applications
            ],
            "talent_submissions": [
                serialize_talent_submission(item) for item in talent_submissions
            ],
        }
    )


@api.get("/admin/hr-contacts")
@admin_required
def get_hr_contacts():
    contacts = HrContact.query.order_by(HrContact.created_at.desc()).all()
    return jsonify(
        [
            {
                "id": item.id,
                "name": item.name,
                "company": item.company,
                "designation": item.designation,
                "email": item.email,
                "phone": item.phone,
                "created_at": item.created_at.isoformat(),
            }
            for item in contacts
        ]
    )


@api.post("/admin/hr-contacts")
@admin_required
def create_hr_contact():
    payload = request.get_json(silent=True) or {}
    required_fields = ["name", "company", "designation", "email", "phone"]
    missing = missing_fields(payload, required_fields)

    if missing:
        return jsonify({"message": f"Missing required fields: {', '.join(missing)}"}), 400

    contact = HrContact(
        name=payload["name"].strip(),
        company=payload["company"].strip(),
        designation=payload["designation"].strip(),
        email=payload["email"].strip(),
        phone=payload["phone"].strip(),
    )
    db.session.add(contact)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "HR contact saved successfully.",
                "contact": {
                    "id": contact.id,
                    "name": contact.name,
                    "company": contact.company,
                    "designation": contact.designation,
                    "email": contact.email,
                    "phone": contact.phone,
                    "created_at": contact.created_at.isoformat(),
                },
            }
        ),
        201,
    )


@api.delete("/admin/hr-contacts/<int:contact_id>")
@admin_required
def delete_hr_contact(contact_id):
    contact = HrContact.query.get(contact_id)

    if contact is None:
        return jsonify({"message": "HR contact not found."}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "HR contact deleted successfully."})


@api.post("/admin/jobs")
@admin_required
def create_job_opening():
    payload = request.get_json(silent=True) or {}
    required_fields = [
        "title",
        "department",
        "location",
        "employment_type",
        "summary",
        "responsibilities",
        "requirements",
    ]
    missing = missing_fields(payload, required_fields)

    if missing:
        return jsonify({"message": f"Missing required fields: {', '.join(missing)}"}), 400

    job_category = payload.get("job_category", "public").strip() or "public"
    if job_category not in {"public", "internal"}:
        return jsonify({"message": "Opening type must be public or internal."}), 400

    job = JobOpening(
        job_category=job_category,
        title=payload["title"].strip(),
        department=payload["department"].strip(),
        location=payload["location"].strip(),
        employment_type=payload["employment_type"].strip(),
        summary=payload["summary"].strip(),
        responsibilities=payload["responsibilities"].strip(),
        requirements=payload["requirements"].strip(),
        is_active=bool(payload.get("is_active", True)),
    )
    db.session.add(job)
    db.session.commit()

    return jsonify({"message": "Job opening posted successfully.", "job": serialize_job(job)}), 201


@api.delete("/admin/jobs/<int:job_id>")
@admin_required
def delete_job_opening(job_id):
    job = JobOpening.query.get(job_id)

    if job is None:
        return jsonify({"message": "Job opening not found."}), 404

    for application in job.applications:
        application.job_title = job.title
        application.job_id = None

    db.session.delete(job)
    db.session.commit()

    return jsonify({"message": "Job opening deleted successfully. Applications were kept."})


@api.delete("/admin/contacts/<int:submission_id>")
@admin_required
def delete_contact_submission(submission_id):
    submission = ContactSubmission.query.get(submission_id)

    if submission is None:
        return jsonify({"message": "Contact submission not found."}), 404

    db.session.delete(submission)
    db.session.commit()

    return jsonify({"message": "Contact submission deleted successfully."})


@api.delete("/admin/consultations/<int:submission_id>")
@admin_required
def delete_consultation_submission(submission_id):
    submission = ConsultationRequest.query.get(submission_id)

    if submission is None:
        return jsonify({"message": "Consultation request not found."}), 404

    db.session.delete(submission)
    db.session.commit()

    return jsonify({"message": "Consultation request deleted successfully."})


@api.delete("/admin/applications/<int:application_id>")
@admin_required
def delete_job_application(application_id):
    application = JobApplication.query.get(application_id)

    if application is None:
        return jsonify({"message": "Job application not found."}), 404

    remove_resume_file(application.resume_file_name)
    db.session.delete(application)
    db.session.commit()

    return jsonify({"message": "Job application deleted successfully."})


@api.delete("/admin/talent-submissions/<int:submission_id>")
@admin_required
def delete_talent_submission(submission_id):
    submission = TalentProfileSubmission.query.get(submission_id)

    if submission is None:
        return jsonify({"message": "Talent submission not found."}), 404

    remove_resume_file(submission.resume_file_name)
    db.session.delete(submission)
    db.session.commit()

    return jsonify({"message": "Talent submission deleted successfully."})


@api.get("/admin/applications/<int:application_id>/resume")
@admin_required
def download_resume(application_id):
    application = JobApplication.query.get(application_id)

    if application is None:
        return jsonify({"message": "Job application not found."}), 404

    return send_from_directory(
        current_app.config["UPLOAD_FOLDER"],
        application.resume_file_name,
        as_attachment=True,
        download_name=application.resume_original_name,
    )


@api.get("/admin/talent-submissions/<int:submission_id>/resume")
@admin_required
def download_talent_resume(submission_id):
    submission = TalentProfileSubmission.query.get(submission_id)

    if submission is None:
        return jsonify({"message": "Talent submission not found."}), 404

    return send_from_directory(
        current_app.config["UPLOAD_FOLDER"],
        submission.resume_file_name,
        as_attachment=True,
        download_name=submission.resume_original_name,
    )


@api.get("/services")
def get_services():
    services = Service.query.order_by(Service.title.asc()).all()
    return jsonify(
        [
            {"id": item.id, "title": item.title, "description": item.description}
            for item in services
        ]
    )


@api.get("/industries")
def get_industries():
    industries = Industry.query.order_by(Industry.name.asc()).all()
    return jsonify(
        [{"id": item.id, "name": item.name, "summary": item.summary} for item in industries]
    )


@api.get("/testimonials")
def get_testimonials():
    testimonials = Testimonial.query.order_by(Testimonial.id.asc()).all()
    return jsonify(
        [
            {
                "id": item.id,
                "quote": item.quote,
                "author_name": item.author_name,
                "author_role": item.author_role,
                "company": item.company
            }
            for item in testimonials
        ]
    )


@api.post("/contact")
def submit_contact():
    payload = request.get_json(silent=True) or {}
    required_fields = ["name", "email", "company", "message"]
    missing = missing_fields(payload, required_fields)

    if missing:
        return jsonify({"message": f"Missing required fields: {', '.join(missing)}"}), 400

    submission = ContactSubmission(
        name=payload["name"].strip(),
        email=payload["email"].strip(),
        company=payload["company"].strip(),
        phone=payload.get("phone", "").strip(),
        message=payload["message"].strip()
    )
    db.session.add(submission)
    db.session.commit()

    return jsonify({"message": "Thanks for contacting us. Our team will reach out shortly."}), 201


@api.post("/consultations")
def submit_consultation():
    payload = request.get_json(silent=True) or {}
    required_fields = ["name", "email", "company", "need_type", "goals"]
    missing = missing_fields(payload, required_fields)

    if missing:
        return jsonify({"message": f"Missing required fields: {', '.join(missing)}"}), 400

    consultation = ConsultationRequest(
        name=payload["name"].strip(),
        email=payload["email"].strip(),
        company=payload["company"].strip(),
        need_type=payload["need_type"].strip(),
        timeline=payload.get("timeline", "").strip(),
        team_size=payload.get("team_size", "").strip(),
        goals=payload["goals"].strip()
    )
    db.session.add(consultation)
    db.session.commit()

    return jsonify({"message": "Your consultation request has been received."}), 201
