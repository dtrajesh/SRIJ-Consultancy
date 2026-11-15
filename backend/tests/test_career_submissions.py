"""Run from backend: python -m unittest discover -s tests -v."""
import io
import tempfile
import unittest

from flask import Flask
from models import db, JobOpening, JobApplication, TalentProfileSubmission, ResumeDocument
from routes import api


class CareerSubmissionsTest(unittest.TestCase):
    def setUp(self):
        self.uploads = tempfile.TemporaryDirectory()
        self.app = Flask(__name__)
        self.app.config.update(TESTING=True, SECRET_KEY='test-key',
            SQLALCHEMY_DATABASE_URI='sqlite://', UPLOAD_FOLDER=self.uploads.name,
            MAX_CONTENT_LENGTH=10 * 1024 * 1024,
            ADMIN_USERNAME='test', ADMIN_PASSWORD='test-password')
        db.init_app(self.app)
        self.app.register_blueprint(api)
        self.context = self.app.app_context()
        self.context.push()
        db.create_all()
        job = JobOpening(title='Developer', department='Engineering', location='Hyderabad',
            employment_type='Full-Time', summary='Build applications',
            responsibilities='Develop software', requirements='Python', job_category='public')
        db.session.add(job)
        db.session.commit()
        self.job_id = job.id
        self.client = self.app.test_client()
        token = self.client.post('/api/admin/login', json={
            'username': 'test', 'password': 'test-password'}).json['token']
        self.auth = {'Authorization': f'Bearer {token}'}

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()
        self.uploads.cleanup()

    def application(self, content=b'%PDF-1.4 test resume', filename='resume.pdf'):
        return {'full_name': 'Test Candidate', 'email': 'candidate@example.com',
                'phone': '1234567890', 'resume': (io.BytesIO(content), filename)}

    def test_job_resume_and_candidate_are_saved_and_downloadable(self):
        response = self.client.post(f'/api/careers/jobs/{self.job_id}/apply', data=self.application())
        self.assertEqual(response.status_code, 201)
        record = JobApplication.query.one()
        self.assertEqual(record.job_id, self.job_id)
        self.assertEqual(record.email, 'candidate@example.com')
        self.assertEqual(db.session.get(ResumeDocument, record.resume_file_name).content, b'%PDF-1.4 test resume')
        url = f'/api/admin/applications/{record.id}/resume'
        self.assertEqual(self.client.get(url).status_code, 401)
        self.assertEqual(self.client.get(url, headers=self.auth).data, b'%PDF-1.4 test resume')
        self.client.delete(f'/api/admin/applications/{record.id}', headers=self.auth)
        self.assertEqual(ResumeDocument.query.count(), 0)

    def test_talent_profile_and_resume_are_saved(self):
        data = self.application()
        data.update(submission_type='join_talent_network', target_job_title='Developer',
            current_location='Hyderabad', years_of_experience='2', employment_preference='Full-Time',
            preferred_work_mode='Hybrid', work_authorization='India', primary_skills='Python',
            professional_summary='Software developer')
        self.assertEqual(self.client.post('/api/careers/talent/submit', data=data).status_code, 201)
        record = TalentProfileSubmission.query.one()
        self.assertEqual(record.submission_type, 'join_talent_network')
        url = f'/api/admin/talent-submissions/{record.id}/resume'
        self.assertEqual(self.client.get(url, headers=self.auth).data, b'%PDF-1.4 test resume')
        self.client.delete(f'/api/admin/talent-submissions/{record.id}', headers=self.auth)
        self.assertEqual(ResumeDocument.query.count(), 0)

    def test_invalid_or_closed_job_and_invalid_uploads_are_rejected(self):
        self.assertEqual(self.client.post('/api/careers/jobs/999/apply', data=self.application()).status_code, 404)
        for content, name in [(b'', 'resume.pdf'), (b'bad', 'resume.exe')]:
            self.assertEqual(self.client.post(f'/api/careers/jobs/{self.job_id}/apply',
                data=self.application(content, name)).status_code, 400)
        job = db.session.get(JobOpening, self.job_id)
        job.is_active = False
        db.session.commit()
        self.assertEqual(self.client.post(f'/api/careers/jobs/{self.job_id}/apply', data=self.application()).status_code, 404)
        self.assertEqual(ResumeDocument.query.count(), 0)
        self.assertEqual(JobApplication.query.count(), 0)

    def test_legacy_disk_resume_is_still_downloadable(self):
        from pathlib import Path
        self.client.post(f'/api/careers/jobs/{self.job_id}/apply', data=self.application())
        record = JobApplication.query.one()
        db.session.delete(db.session.get(ResumeDocument, record.resume_file_name))
        db.session.commit()
        Path(self.uploads.name, record.resume_file_name).write_bytes(b'legacy resume')
        with self.client.get(f'/api/admin/applications/{record.id}/resume', headers=self.auth) as response:
            self.assertEqual(response.data, b'legacy resume')
