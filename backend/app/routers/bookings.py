from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.booking import BookingRequest, BookingResponse, BookingStatusUpdate
from app.models.booking import BookingModel
from app.database import get_pool
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

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
        booking_model = BookingModel(get_pool())
        
        # Convert Pydantic model to dict
        booking_data = booking.model_dump(by_alias=True)
        
        # Create booking in database
        created_booking = await booking_model.create_booking(booking_data)
        
        logger.info(f"New booking created: {created_booking['id']} for {created_booking['email']}")

        # Notify Fiona via SMS
        try:
            from app.utils.sms import notify_new_booking
            notify_new_booking(created_booking)
        except Exception as sms_error:
            logger.warning(f"SMS notification failed: {str(sms_error)}")

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
        booking_model = BookingModel(get_pool())
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
        booking_model = BookingModel(get_pool())
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
        booking_model = BookingModel(get_pool())
        
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
        
        # Send confirmation email if status changed to confirmed
        if status_update.status == "confirmed":
            try:
                from app.utils.email import send_booking_confirmation_email
                email_sent = send_booking_confirmation_email(
                    client_name=updated_booking["name"],
                    client_email=updated_booking["email"],
                    tattoo_idea=updated_booking["tattoo_idea"],
                    body_placement=updated_booking.get("body_placement"),
                    size=updated_booking.get("size"),
                    preferred_date=updated_booking.get("preferred_date")
                )
                if email_sent:
                    logger.info(f"Confirmation email sent to {updated_booking['email']}")
                else:
                    logger.warning(f"Failed to send confirmation email to {updated_booking['email']}")
            except Exception as email_error:
                logger.error(f"Error sending confirmation email: {str(email_error)}")

            # Add event to Google Calendar
            try:
                from app.utils.google_calendar import create_booking_event
                create_booking_event(updated_booking)
            except Exception as cal_error:
                logger.warning(f"Google Calendar event failed: {str(cal_error)}")
                # Don't fail the request if email fails
        
        # Send cancellation email if status changed to cancelled
        elif status_update.status == "cancelled":
            try:
                from app.utils.email import send_booking_cancellation_email
                email_sent = send_booking_cancellation_email(
                    client_name=updated_booking["name"],
                    client_email=updated_booking["email"],
                    tattoo_idea=updated_booking["tattoo_idea"],
                    reason="Your booking has been cancelled by the studio."
                )
                if email_sent:
                    logger.info(f"Cancellation email sent to {updated_booking['email']}")
                else:
                    logger.warning(f"Failed to send cancellation email to {updated_booking['email']}")
            except Exception as email_error:
                logger.error(f"Error sending cancellation email: {str(email_error)}")
                # Don't fail the request if email fails
        
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
        booking_model = BookingModel(get_pool())
        
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
        booking_model = BookingModel(get_pool())
        
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

@router.post("/bookings/{booking_id}/send-reminder")
async def send_reminder(booking_id: str):
    """
    Send appointment reminder email for a specific booking
    """
    try:
        booking_model = BookingModel(get_pool())
        
        # Check if booking exists
        booking = await booking_model.get_booking_by_id(booking_id)
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        # Only send reminders for confirmed bookings
        if booking["status"] != "confirmed":
            raise HTTPException(
                status_code=400, 
                detail=f"Cannot send reminder for booking with status: {booking['status']}. Only confirmed bookings can receive reminders."
            )
        
        # Check if preferred_date exists
        if not booking.get("preferred_date"):
            raise HTTPException(
                status_code=400,
                detail="Cannot send reminder: No appointment date set for this booking"
            )
        
        # Send reminder email
        try:
            from app.utils.email import send_appointment_reminder_email
            email_sent = send_appointment_reminder_email(
                client_name=booking["name"],
                client_email=booking["email"],
                appointment_date=booking["preferred_date"],
                tattoo_idea=booking["tattoo_idea"],
                body_placement=booking.get("body_placement")
            )
            
            if email_sent:
                logger.info(f"Reminder email sent to {booking['email']} for booking {booking_id}")
                return {
                    "status": "success",
                    "message": f"Reminder email sent to {booking['email']}"
                }
            else:
                raise HTTPException(
                    status_code=500,
                    detail="Failed to send reminder email. Check SMTP configuration."
                )
                
        except Exception as email_error:
            logger.error(f"Error sending reminder email: {str(email_error)}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to send reminder email: {str(email_error)}"
            )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in send_reminder for booking {booking_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send reminder: {str(e)}")
