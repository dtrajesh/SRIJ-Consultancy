from functools import wraps

from flask import Blueprint, current_app, jsonify, request
from itsdangerous import BadSignature, URLSafeSerializer

from models import ConsultationRequest, ContactSubmission, Industry, Service, Testimonial, db

api = Blueprint("api", __name__, url_prefix="/api")


def missing_fields(payload, required_fields):
    return [field for field in required_fields if not str(payload.get(field, "")).strip()]


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
        }
    )


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
