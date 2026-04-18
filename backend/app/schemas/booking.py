from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class BookingRequest(BaseModel):
    """Schema for incoming booking requests"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    tattoo_idea: str = Field(..., min_length=10, max_length=2000, alias="tattooIdea")
    preferred_date: Optional[str] = Field(None, alias="preferredDate")
    body_placement: Optional[str] = Field(None, max_length=100, alias="bodyPlacement")
    size: Optional[str] = Field(None, max_length=50)
    
    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "+1-555-123-4567",
                "tattooIdea": "Dragon tattoo on my back with intricate details",
                "preferredDate": "2025-01-15",
                "bodyPlacement": "Upper back",
                "size": "10x12 inches"
            }
        }

class BookingResponse(BaseModel):
    """Schema for booking response"""
    id: str
    name: str
    email: str
    phone: str
    tattoo_idea: str
    preferred_date: Optional[str] = None
    body_placement: Optional[str] = None
    size: Optional[str] = None
    status: str = "pending"
    created_at: datetime
    
class BookingStatusUpdate(BaseModel):
    """Schema for updating booking status"""
    status: str = Field(..., pattern="^(pending|confirmed|completed|cancelled)$")
