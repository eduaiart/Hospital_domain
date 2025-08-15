from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_ai_summarize_proxy(monkeypatch):
	# monkeypatch httpx.AsyncClient.post to avoid real network
	class DummyResp:
		def __init__(self, json_data, status_code=200):
			self._json = json_data
			self.status_code = status_code
		def raise_for_status(self):
			if self.status_code >= 400:
				raise Exception("error")
		def json(self):
			return self._json

	async def fake_post(self, url, json):
		return DummyResp({"summary": json["text"][:10]})

	from httpx import AsyncClient
	monkeypatch.setattr(AsyncClient, "post", fake_post, raising=True)

	resp = client.post("/api/v1/ai/summarize", json={"text": "abcdefghijklmnopqrstuvwxyz"})
	assert resp.status_code == 200
	assert resp.json()["summary"] == "abcdefghij"