Epic-class Hospital Management Platform (Monorepo)

- Backend API: FastAPI (Python)
- Web: Next.js (placeholder)
- Mobile: Expo React Native (placeholder)
- AI service: FastAPI (stub)
- Infra: Docker Compose for local

Quickstart

- Backend (local):
  - python3 -m pip install --user -r backend/requirements.txt
  - PYTHONPATH=backend uvicorn app.main:app --reload --app-dir backend
- Tests (backend):
  - PYTHONPATH=backend python3 -m pytest -q backend
- AI service (local):
  - python3 -m pip install --user -r ml/requirements.txt
  - uvicorn app.main:app --reload --app-dir ml --port 8001
- Web (local):
  - cd web && npm i && npm run dev
  - set `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000`
- Mobile (local):
  - cd mobile && npm i && npm run start
  - Ensure `expo` is installed; API base URL from `app.json` extra.apiBaseUrl
- Docker (local):
  - docker compose up --build

Services

- backend: http://localhost:8000
- ml (AI stub): http://localhost:8001
- web: http://localhost:3000

Notes

- Shared API for web and mobile under `/api/v1`
- Synthetic data only; no PHI
