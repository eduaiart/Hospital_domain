from typing import List
from uuid import uuid4

from fastapi import APIRouter, HTTPException

from app.schemas.patient import PatientCreate, PatientRead
from app.db.memory import patient_store

router = APIRouter()

@router.get("/", response_model=List[PatientRead])
def list_patients() -> List[PatientRead]:
	return list(patient_store.values())

@router.post("/", response_model=PatientRead, status_code=201)
def create_patient(payload: PatientCreate) -> PatientRead:
	patient_id = str(uuid4())
	patient: PatientRead = PatientRead(id=patient_id, **payload.model_dump())
	patient_store[patient_id] = patient
	return patient

@router.get("/{patient_id}", response_model=PatientRead)
def get_patient(patient_id: str) -> PatientRead:
	patient = patient_store.get(patient_id)
	if not patient:
		raise HTTPException(status_code=404, detail="Patient not found")
	return patient