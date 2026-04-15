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
