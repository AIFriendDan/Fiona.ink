from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from typing import List, Optional
import uuid

class BookingModel:
    """Database operations for bookings"""
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db.bookings
    
    async def create_booking(self, booking_data: dict) -> dict:
        """Create a new booking in the database"""
        booking_document = {
            "id": str(uuid.uuid4()),
            "name": booking_data["name"],
            "email": booking_data["email"],
            "phone": booking_data["phone"],
            "tattoo_idea": booking_data.get("tattoo_idea") or booking_data.get("tattooIdea"),
            "preferred_date": booking_data.get("preferred_date") or booking_data.get("preferredDate"),
            "body_placement": booking_data.get("body_placement") or booking_data.get("bodyPlacement"),
            "size": booking_data.get("size"),
            "status": "pending",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await self.collection.insert_one(booking_document)
        
        if result.inserted_id:
            return booking_document
        else:
            raise Exception("Failed to create booking")
    
    async def get_booking_by_id(self, booking_id: str) -> Optional[dict]:
        """Get a booking by ID"""
        booking = await self.collection.find_one({"id": booking_id})
        return booking
    
    async def get_all_bookings(
        self, 
        status: Optional[str] = None,
        limit: int = 100,
        skip: int = 0
    ) -> List[dict]:
        """Get all bookings with optional status filter"""
        query = {}
        if status:
            query["status"] = status
        
        cursor = self.collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
        bookings = await cursor.to_list(length=limit)
        return bookings
    
    async def update_booking_status(self, booking_id: str, status: str) -> bool:
        """Update booking status"""
        result = await self.collection.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "status": status,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        return result.modified_count > 0
    
    async def delete_booking(self, booking_id: str) -> bool:
        """Delete a booking"""
        result = await self.collection.delete_one({"id": booking_id})
        return result.deleted_count > 0
    
    async def get_bookings_count(self, status: Optional[str] = None) -> int:
        """Get count of bookings"""
        query = {}
        if status:
            query["status"] = status
        return await self.collection.count_documents(query)
