import os
import logging

logger = logging.getLogger(__name__)


def send_sms(to: str, body: str) -> bool:
    try:
        from twilio.rest import Client

        account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
        auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
        from_number = os.environ.get("TWILIO_FROM_NUMBER")

        if not all([account_sid, auth_token, from_number]):
            logger.warning("Twilio env vars not set — skipping SMS")
            return False

        client = Client(account_sid, auth_token)
        client.messages.create(body=body, from_=from_number, to=to)
        logger.info(f"SMS sent to {to}")
        return True

    except Exception as e:
        logger.error(f"SMS send failed: {str(e)}")
        return False


def notify_new_booking(booking: dict) -> bool:
    fiona_number = os.environ.get("FIONA_PHONE_NUMBER")
    if not fiona_number:
        logger.warning("FIONA_PHONE_NUMBER not set — skipping SMS notification")
        return False

    idea_preview = (booking.get("tattoo_idea") or "")[:80]
    date_str = booking.get("preferred_date") or "No date specified"
    placement = booking.get("body_placement") or "Not specified"

    body = (
        f"New Booking Request! 🖤\n"
        f"Name: {booking.get('name')}\n"
        f"Phone: {booking.get('phone')}\n"
        f"Idea: {idea_preview}\n"
        f"Placement: {placement}\n"
        f"Date: {date_str}\n"
        f"Log in to confirm: fiona.ink/admin"
    )
    return send_sms(fiona_number, body)
