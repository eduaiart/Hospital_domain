from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="HMS ML Service", version="0.1.0")

class SummarizeRequest(BaseModel):
	text: str

class SummarizeResponse(BaseModel):
	summary: str

@app.get("/health")
def health():
	return {"status": "ok"}

@app.post("/summarize", response_model=SummarizeResponse)
def summarize(req: SummarizeRequest) -> SummarizeResponse:
	text = req.text.strip()
	if not text:
		return SummarizeResponse(summary="")
	# naive stub: first 200 chars
	return SummarizeResponse(summary=(text[:200] + ("..." if len(text) > 200 else "")))