from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

from app.database import connect as connect_db, disconnect as disconnect_db, get_pool

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(
    title="Fiona.Ink API",
    description="Backend API for Fiona's Tattoo Artist Website",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Fiona.Ink API", "status": "running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    await get_pool().execute(
        "INSERT INTO status_checks (id, client_name, timestamp) VALUES ($1, $2, $3)",
        status_obj.id, status_obj.client_name, status_obj.timestamp
    )
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await get_pool().fetch(
        "SELECT id, client_name, timestamp FROM status_checks ORDER BY timestamp DESC LIMIT 1000"
    )
    return [dict(row) for row in rows]

# Import and include booking router
from app.routers.bookings import router as bookings_router
from app.routers.auth import router as auth_router
api_router.include_router(bookings_router, tags=["bookings"])
api_router.include_router(auth_router, prefix="/auth", tags=["authentication"])

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Admin seeding function
async def seed_admin():
    """Seed admin user on startup"""
    from app.utils.auth import hash_password, verify_password

    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")

    pool = get_pool()
    existing = await pool.fetchrow("SELECT * FROM users WHERE email = $1", admin_email)

    if existing is None:
        hashed = hash_password(admin_password)
        await pool.execute(
            "INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES ($1, $2, $3, 'Admin', 'admin', $4)",
            str(uuid.uuid4()), admin_email, hashed, datetime.now(timezone.utc)
        )
        logger.info(f"Admin user created: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        hashed = hash_password(admin_password)
        await pool.execute(
            "UPDATE users SET password_hash = $1 WHERE email = $2",
            hashed, admin_email
        )
        logger.info(f"Admin password updated for: {admin_email}")

@app.on_event("startup")
async def startup_event():
    """Run startup tasks"""
    await connect_db()
    logger.info("Database connected and schema ensured")
    await seed_admin()

@app.on_event("shutdown")
async def shutdown_db_client():
    await disconnect_db()