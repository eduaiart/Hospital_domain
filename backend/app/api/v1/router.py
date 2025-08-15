from fastapi import APIRouter
from app.api.v1.endpoints import patients
from app.api.v1.endpoints import ai

api_router = APIRouter()
api_router.include_router(patients.router, prefix="/patients", tags=["patients"]) 
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])