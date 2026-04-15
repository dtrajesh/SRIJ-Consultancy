import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from config import Config
from models import Industry, Service, Testimonial, db
from routes import api
from seed_data import INDUSTRIES, SERVICES, TESTIMONIALS

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    app.register_blueprint(api)

    with app.app_context():
        db.create_all()
        seed_reference_data()

    return app


def seed_reference_data():
    if Service.query.count() == 0:
        db.session.add_all(Service(**item) for item in SERVICES)

    if Industry.query.count() == 0:
        db.session.add_all(Industry(**item) for item in INDUSTRIES)

    if Testimonial.query.count() == 0:
        db.session.add_all(Testimonial(**item) for item in TESTIMONIALS)

    db.session.commit()


app = create_app()


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
