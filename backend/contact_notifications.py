"""Optional SMTP notification for saved contact enquiries."""
from email.message import EmailMessage
import smtplib
import ssl

from flask import current_app


def notify_contact(submission):
    config = current_app.config
    if not config.get("SMTP_HOST"):
        return False
    message = EmailMessage()
    message["Subject"] = "New Trinexora website enquiry"
    message["From"] = config["SMTP_FROM"]
    message["To"] = config["CONTACT_NOTIFICATION_TO"]
    message["Reply-To"] = submission.email
    message.set_content(
        f"Name: {submission.name}\nEmail: {submission.email}\n"
        f"Company: {submission.company or '-'}\nPhone: {submission.phone or '-'}\n\n"
        f"{submission.message}"
    )
    context = ssl.create_default_context()
    smtp_class = smtplib.SMTP_SSL if config["SMTP_USE_SSL"] else smtplib.SMTP
    options = {"timeout": 15}
    if config["SMTP_USE_SSL"]:
        options["context"] = context
    with smtp_class(config["SMTP_HOST"], config["SMTP_PORT"], **options) as server:
        if not config["SMTP_USE_SSL"]:
            server.starttls(context=context)
        if config.get("SMTP_USERNAME"):
            server.login(config["SMTP_USERNAME"], config["SMTP_PASSWORD"])
        server.send_message(message)
    return True
