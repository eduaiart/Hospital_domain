import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
	resp = client.get("/health")
	assert resp.status_code == 200
	assert resp.json()["status"] == "ok"


def test_crud_patients():
	# Initially empty
	resp = client.get("/api/v1/patients/")
	assert resp.status_code == 200
	assert resp.json() == []

	# Create
	payload = {
		"first_name": "Jane",
		"last_name": "Doe",
		"date_of_birth": "1990-01-01",
		"sex": "female",
		"phone": "555-111-2222",
		"email": "jane@example.com",
	}
	resp = client.post("/api/v1/patients/", json=payload)
	assert resp.status_code == 201
	patient = resp.json()
	assert patient["id"]

	# Get by id
	resp = client.get(f"/api/v1/patients/{patient['id']}")
	assert resp.status_code == 200
	assert resp.json()["first_name"] == "Jane"