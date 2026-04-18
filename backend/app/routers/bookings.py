from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.booking import BookingRequest, BookingResponse, BookingStatusUpdate
from app.models.booking import BookingModel
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'tattoo_studio')]

@router.post("/bookings", response_model=BookingResponse, status_code=201)
async def create_booking(booking: BookingRequest):
    """
    Create a new booking request
    
    - **name**: Client's full name (required)
    - **email**: Client's email address (required)
    - **phone**: Client's phone number (required)
    - **tattooIdea**: Description of the desired tattoo (required)
    - **preferredDate**: Preferred appointment date (optional)
    - **bodyPlacement**: Where on the body the tattoo will be placed (optional)
    - **size**: Approximate size of the tattoo (optional)
    """
    try:
        booking_model = BookingModel(db)
        
        # Convert Pydantic model to dict
        booking_data = booking.model_dump(by_alias=True)
        
        # Create booking in database
        created_booking = await booking_model.create_booking(booking_data)
        
        logger.info(f"New booking created: {created_booking['id']} for {created_booking['email']}")
        
        return BookingResponse(**created_booking)
        
    except Exception as e:
        logger.error(f"Error creating booking: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create booking: {str(e)}")

@router.get("/bookings", response_model=List[BookingResponse])
async def get_bookings(
    status: Optional[str] = Query(None, regex="^(pending|confirmed|completed|cancelled)$"),
    limit: int = Query(100, ge=1, le=500),
    skip: int = Query(0, ge=0)
):
    """
    Get all booking requests with optional filtering
    
    - **status**: Filter by booking status (pending, confirmed, completed, cancelled)
    - **limit**: Maximum number of results to return (default: 100, max: 500)
    - **skip**: Number of results to skip for pagination (default: 0)
    """
    try:
        booking_model = BookingModel(db)
        bookings = await booking_model.get_all_bookings(status=status, limit=limit, skip=skip)
        
        return [BookingResponse(**booking) for booking in bookings]
        
    except Exception as e:
        logger.error(f"Error fetching bookings: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch bookings: {str(e)}")

@router.get("/bookings/{booking_id}", response_model=BookingResponse)
async def get_booking(booking_id: str):
    """
    Get a specific booking by ID
    """
    try:
        booking_model = BookingModel(db)
        booking = await booking_model.get_booking_by_id(booking_id)
        
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        return BookingResponse(**booking)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching booking {booking_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch booking: {str(e)}")

@router.patch("/bookings/{booking_id}/status", response_model=BookingResponse)
async def update_booking_status(booking_id: str, status_update: BookingStatusUpdate):
    """
    Update the status of a booking
    
    - **status**: New status (pending, confirmed, completed, cancelled)
    """
    try:
        booking_model = BookingModel(db)
        
        # Check if booking exists
        booking = await booking_model.get_booking_by_id(booking_id)
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        # Update status
        success = await booking_model.update_booking_status(booking_id, status_update.status)
        
        if not success:
            raise HTTPException(status_code=500, detail="Failed to update booking status")
        
        # Fetch updated booking
        updated_booking = await booking_model.get_booking_by_id(booking_id)
        
        logger.info(f"Booking {booking_id} status updated to {status_update.status}")
        
        return BookingResponse(**updated_booking)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating booking {booking_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update booking: {str(e)}")

@router.delete("/bookings/{booking_id}", status_code=204)
async def delete_booking(booking_id: str):
    """
    Delete a booking by ID
    """
    try:
        booking_model = BookingModel(db)
        
        # Check if booking exists
        booking = await booking_model.get_booking_by_id(booking_id)
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        # Delete booking
        success = await booking_model.delete_booking(booking_id)
        
        if not success:
            raise HTTPException(status_code=500, detail="Failed to delete booking")
        
        logger.info(f"Booking {booking_id} deleted")
        
        return None
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting booking {booking_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to delete booking: {str(e)}")

@router.get("/bookings/stats/count")
async def get_booking_stats():
    """
    Get booking statistics
    """
    try:
        booking_model = BookingModel(db)
        
        total = await booking_model.get_bookings_count()
        pending = await booking_model.get_bookings_count(status="pending")
        confirmed = await booking_model.get_bookings_count(status="confirmed")
        completed = await booking_model.get_bookings_count(status="completed")
        cancelled = await booking_model.get_bookings_count(status="cancelled")
        
        return {
            "total": total,
            "pending": pending,
            "confirmed": confirmed,
            "completed": completed,
            "cancelled": cancelled
        }
        
    except Exception as e:
        logger.error(f"Error fetching booking stats: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch stats: {str(e)}")
