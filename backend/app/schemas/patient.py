from typing import Optional
from pydantic import BaseModel, Field, EmailStr


class PatientBase(BaseModel):
	first_name: str = Field(..., min_length=1)
	last_name: str = Field(..., min_length=1)
	date_of_birth: Optional[str] = Field(None, description="YYYY-MM-DD")
	sex: Optional[str] = Field(None, description="administrative sex")
	phone: Optional[str] = None
	email: Optional[EmailStr] = None


class PatientCreate(PatientBase):
	pass


class PatientRead(PatientBase):
	id: str