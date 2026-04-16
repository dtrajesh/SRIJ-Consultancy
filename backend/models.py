from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class TimestampMixin:
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


class Service(db.Model, TimestampMixin):
    __tablename__ = "services"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)


class Industry(db.Model, TimestampMixin):
    __tablename__ = "industries"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, unique=True)
    summary = db.Column(db.Text, nullable=False)


class Testimonial(db.Model, TimestampMixin):
    __tablename__ = "testimonials"

    id = db.Column(db.Integer, primary_key=True)
    quote = db.Column(db.Text, nullable=False)
    author_name = db.Column(db.String(120), nullable=False)
    author_role = db.Column(db.String(160), nullable=False)
    company = db.Column(db.String(120), nullable=False)


class ContactSubmission(db.Model, TimestampMixin):
    __tablename__ = "contact_submissions"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(160), nullable=False)
    company = db.Column(db.String(160), nullable=False)
    phone = db.Column(db.String(40))
    message = db.Column(db.Text, nullable=False)


class ConsultationRequest(db.Model, TimestampMixin):
    __tablename__ = "consultation_requests"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(160), nullable=False)
    company = db.Column(db.String(160), nullable=False)
    need_type = db.Column(db.String(120), nullable=False)
    timeline = db.Column(db.String(120))
    team_size = db.Column(db.String(120))
    goals = db.Column(db.Text, nullable=False)


class JobOpening(db.Model, TimestampMixin):
    __tablename__ = "job_openings"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(160), nullable=False)
    department = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    employment_type = db.Column(db.String(80), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    responsibilities = db.Column(db.Text, nullable=False)
    requirements = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)


class JobApplication(db.Model, TimestampMixin):
    __tablename__ = "job_applications"

    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey("job_openings.id"), nullable=True)
    job_title = db.Column(db.String(160), nullable=False)
    full_name = db.Column(db.String(160), nullable=False)
    email = db.Column(db.String(160), nullable=False)
    phone = db.Column(db.String(40), nullable=False)
    current_company = db.Column(db.String(160))
    years_of_experience = db.Column(db.String(40))
    linkedin_url = db.Column(db.String(255))
    cover_letter = db.Column(db.Text)
    resume_file_name = db.Column(db.String(255), nullable=False)
    resume_original_name = db.Column(db.String(255), nullable=False)

    job = db.relationship("JobOpening", backref=db.backref("applications", lazy=True))


class HrContact(db.Model, TimestampMixin):
    __tablename__ = "hr_contacts"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(160), nullable=False)
    company = db.Column(db.String(160), nullable=False)
    designation = db.Column(db.String(160), nullable=False)
    email = db.Column(db.String(160), nullable=False)
    phone = db.Column(db.String(40), nullable=False)
