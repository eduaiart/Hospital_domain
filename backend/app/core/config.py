from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    api_v1_prefix: str = "/api/v1"
    ml_base_url: str = "http://localhost:8001"


settings = Settings()