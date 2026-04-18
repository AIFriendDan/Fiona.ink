from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class LoginRequest(BaseModel):
    """Schema for login requests"""
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserResponse(BaseModel):
    """Schema for user response"""
    id: str
    email: str
    name: str
    role: str

class RefreshTokenRequest(BaseModel):
    """Schema for refresh token requests"""
    pass  # Token comes from cookie
