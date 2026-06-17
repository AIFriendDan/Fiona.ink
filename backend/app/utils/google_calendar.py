import os
import json
import logging
from datetime import datetime, timedelta, timezone

logger = logging.getLogger(__name__)

SCOPES = ["https://www.googleapis.com/auth/calendar"]


def _get_credentials():
    creds_json = os.environ.get("GOOGLE_CALENDAR_CREDENTIALS")
    if not creds_json:
        return None

    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request

    data = json.loads(creds_json)
    creds = Credentials(
        token=data.get("token"),
        refresh_token=data.get("refresh_token"),
        token_uri="https://oauth2.googleapis.com/token",
        client_id=data.get("client_id"),
        client_secret=data.get("client_secret"),
        scopes=SCOPES,
    )

    if creds.expired and creds.refresh_token:
        creds.refresh(Request())

    return creds


def create_booking_event(booking: dict) -> str | None:
    """
    Creates a Google Calendar event for a confirmed booking.
    Returns the event HTML link, or None if calendar is not configured.
    """
    try:
        creds = _get_credentials()
        if not creds:
            logger.warning("GOOGLE_CALENDAR_CREDENTIALS not set — skipping calendar event")
            return None

        from googleapiclient.discovery import build

        calendar_id = os.environ.get("GOOGLE_CALENDAR_ID", "primary")
        service = build("calendar", "v3", credentials=creds)

        preferred_date = booking.get("preferred_date")
        if preferred_date:
            if isinstance(preferred_date, str):
                # Handle both date-only ("2026-06-20") and full datetime strings
                if "T" in preferred_date or " " in preferred_date:
                    start_dt = datetime.fromisoformat(preferred_date.replace("Z", "+00:00"))
                else:
                    start_dt = datetime.fromisoformat(f"{preferred_date}T10:00:00").replace(
                        tzinfo=timezone.utc
                    )
            else:
                start_dt = preferred_date
            end_dt = start_dt + timedelta(hours=3)
            time_zone = os.environ.get("STUDIO_TIMEZONE", "America/Los_Angeles")
            start = {"dateTime": start_dt.isoformat(), "timeZone": time_zone}
            end = {"dateTime": end_dt.isoformat(), "timeZone": time_zone}
        else:
            today = datetime.now().strftime("%Y-%m-%d")
            start = {"date": today}
            end = {"date": today}

        description = "\n".join([
            f"Client: {booking.get('name')}",
            f"Phone: {booking.get('phone', 'N/A')}",
            f"Email: {booking.get('email', 'N/A')}",
            f"Tattoo Idea: {booking.get('tattoo_idea', 'N/A')}",
            f"Placement: {booking.get('body_placement', 'N/A')}",
            f"Size: {booking.get('size', 'N/A')}",
        ])

        event = {
            "summary": f"Tattoo Appt — {booking.get('name')}",
            "description": description,
            "start": start,
            "end": end,
            "reminders": {
                "useDefault": False,
                "overrides": [
                    {"method": "popup", "minutes": 60},
                    {"method": "popup", "minutes": 1440},
                ],
            },
        }

        created = service.events().insert(calendarId=calendar_id, body=event).execute()
        link = created.get("htmlLink")
        logger.info(f"Google Calendar event created: {link}")
        return link

    except Exception as e:
        logger.error(f"Google Calendar event creation failed: {str(e)}")
        return None
