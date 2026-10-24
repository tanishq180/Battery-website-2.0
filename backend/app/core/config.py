from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Sunka Batteries API"
    VERSION: str = "0.1.0"
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/import_export_db"

    # JWT Authentication Configuration
    SECRET_KEY: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Email Service Configuration (Resend or SendGrid)
    EMAIL_API_KEY: str = ""
    SENDER_EMAIL: str = "quotes@yourimportexport.com"
    ADMIN_NOTIFICATION_EMAIL: str = "merihindustries@gmail.com"

    # WhatsApp Integration Configuration
    WHATSAPP_BUSINESS_NUMBER: str = "917538844410"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
