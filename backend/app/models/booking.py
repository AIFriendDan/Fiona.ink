from datetime import datetime, timezone
from typing import List, Optional
import uuid
import asyncpg


class BookingModel:
    """Database operations for bookings"""

    def __init__(self, pool: asyncpg.Pool):
        self.pool = pool

    async def create_booking(self, booking_data: dict) -> dict:
        """Create a new booking in the database"""
        booking_id = str(uuid.uuid4())
        now = datetime.now(timezone.utc)

        row = await self.pool.fetchrow(
            """
            INSERT INTO bookings
                (id, name, email, phone, tattoo_idea, preferred_date, body_placement, size, status, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', $9, $9)
            RETURNING *
            """,
            booking_id,
            booking_data["name"],
            booking_data["email"],
            booking_data["phone"],
            booking_data.get("tattoo_idea") or booking_data.get("tattooIdea"),
            booking_data.get("preferred_date") or booking_data.get("preferredDate"),
            booking_data.get("body_placement") or booking_data.get("bodyPlacement"),
            booking_data.get("size"),
            now,
        )

        if row is None:
            raise Exception("Failed to create booking")

        return dict(row)

    async def get_booking_by_id(self, booking_id: str) -> Optional[dict]:
        """Get a booking by ID"""
        row = await self.pool.fetchrow("SELECT * FROM bookings WHERE id = $1", booking_id)
        return dict(row) if row else None

    async def get_all_bookings(
        self,
        status: Optional[str] = None,
        limit: int = 100,
        skip: int = 0
    ) -> List[dict]:
        """Get all bookings with optional status filter"""
        if status:
            rows = await self.pool.fetch(
                "SELECT * FROM bookings WHERE status = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
                status, limit, skip
            )
        else:
            rows = await self.pool.fetch(
                "SELECT * FROM bookings ORDER BY created_at DESC LIMIT $1 OFFSET $2",
                limit, skip
            )
        return [dict(row) for row in rows]

    async def update_booking_status(self, booking_id: str, status: str) -> bool:
        """Update booking status"""
        result = await self.pool.execute(
            "UPDATE bookings SET status = $1, updated_at = $2 WHERE id = $3",
            status, datetime.now(timezone.utc), booking_id
        )
        return result.split()[-1] != "0"

    async def delete_booking(self, booking_id: str) -> bool:
        """Delete a booking"""
        result = await self.pool.execute("DELETE FROM bookings WHERE id = $1", booking_id)
        return result.split()[-1] != "0"

    async def get_bookings_count(self, status: Optional[str] = None) -> int:
        """Get count of bookings"""
        if status:
            return await self.pool.fetchval("SELECT COUNT(*) FROM bookings WHERE status = $1", status)
        return await self.pool.fetchval("SELECT COUNT(*) FROM bookings")
