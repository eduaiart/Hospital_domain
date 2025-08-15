from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx

from app.core.config import settings

router = APIRouter()


class SummarizeIn(BaseModel):
    text: str


class SummarizeOut(BaseModel):
    summary: str


@router.post("/summarize", response_model=SummarizeOut)
async def summarize(payload: SummarizeIn) -> SummarizeOut:
    async with httpx.AsyncClient(base_url=settings.ml_base_url, timeout=10) as client:
        try:
            resp = await client.post("/summarize", json=payload.model_dump())
            resp.raise_for_status()
        except httpx.HTTPError as exc:
            raise HTTPException(status_code=502, detail=f"ML service error: {exc}")
        return SummarizeOut(**resp.json())