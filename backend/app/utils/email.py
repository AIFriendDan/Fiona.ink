import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import os
import logging

logger = logging.getLogger(__name__)

def send_email(
    to_email: str,
    subject: str,
    html_content: str,
    plain_content: Optional[str] = None
) -> bool:
    """
    Send email using SMTP
    
    Args:
        to_email: Recipient email address
        subject: Email subject
        html_content: HTML email content
        plain_content: Plain text fallback (optional)
    
    Returns:
        bool: True if email sent successfully
    """
    try:
        smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.environ.get("SMTP_PORT", "587"))
        smtp_user = os.environ.get("SMTP_USER")
        smtp_password = os.environ.get("SMTP_PASSWORD")
        from_email = os.environ.get("FROM_EMAIL", smtp_user)
        from_name = os.environ.get("FROM_NAME", "Fiona.Ink")
        
        # Check if SMTP is configured
        if not smtp_user or not smtp_password:
            logger.warning("SMTP credentials not configured. Email not sent.")
            return False
        
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = f"{from_name} <{from_email}>"
        message["To"] = to_email
        
        # Add plain text version
        if plain_content:
            part1 = MIMEText(plain_content, "plain")
            message.attach(part1)
        
        # Add HTML version
        part2 = MIMEText(html_content, "html")
        message.attach(part2)
        
        # Send email
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(from_email, to_email, message.as_string())
        
        logger.info(f"Email sent successfully to {to_email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {str(e)}")
        return False

def send_booking_confirmation_email(
    client_name: str,
    client_email: str,
    tattoo_idea: str,
    body_placement: Optional[str] = None,
    size: Optional[str] = None,
    preferred_date: Optional[str] = None
) -> bool:
    """
    Send booking confirmation email to client
    """
    subject = "Your Tattoo Booking is Confirmed! - Fiona.Ink"
    
    # Build details section
    details_html = ""
    if body_placement:
        details_html += f"""
        <tr>
            <td style="padding: 8px; color: #666; border-bottom: 1px solid #eee;">Placement:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{body_placement}</td>
        </tr>
        """
    
    if size:
        details_html += f"""
        <tr>
            <td style="padding: 8px; color: #666; border-bottom: 1px solid #eee;">Size:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{size}</td>
        </tr>
        """
    
    if preferred_date:
        details_html += f"""
        <tr>
            <td style="padding: 8px; color: #666; border-bottom: 1px solid #eee;">Preferred Date:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">{preferred_date}</td>
        </tr>
        """
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(90deg, #a855f7 0%, #06b6d4 100%); padding: 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 2px;">
                                    FIONA<span style="color: #10b981;">.</span>INK
                                </h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px; color: #ffffff;">
                                <h2 style="margin: 0 0 20px 0; color: #06b6d4; font-size: 24px;">
                                    Booking Confirmed! ✓
                                </h2>
                                
                                <p style="margin: 0 0 20px 0; color: #cccccc; font-size: 16px; line-height: 1.6;">
                                    Hi {client_name},
                                </p>
                                
                                <p style="margin: 0 0 30px 0; color: #cccccc; font-size: 16px; line-height: 1.6;">
                                    Great news! Your tattoo booking has been <strong style="color: #10b981;">confirmed</strong>. 
                                    I'm excited to bring your vision to life!
                                </p>
                                
                                <!-- Booking Details -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 8px; margin-bottom: 30px; border: 1px solid #333;">
                                    <tr>
                                        <td style="padding: 20px;">
                                            <h3 style="margin: 0 0 15px 0; color: #a855f7; font-size: 18px;">Your Tattoo Details</h3>
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                {details_html}
                                                <tr>
                                                    <td colspan="2" style="padding: 15px 8px 8px 8px; color: #666;">Your Idea:</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="padding: 8px; background-color: #0a0a0a; border-radius: 6px; color: #e0e0e0; line-height: 1.5;">
                                                        {tattoo_idea}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Next Steps -->
                                <div style="background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%); border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                    <h3 style="margin: 0 0 10px 0; color: #ffffff; font-size: 18px;">What's Next?</h3>
                                    <ul style="margin: 0; padding-left: 20px; color: #ffffff; line-height: 1.8;">
                                        <li>I'll be in touch within 24-48 hours to finalize the appointment time</li>
                                        <li>We'll discuss the design in detail and make any adjustments you'd like</li>
                                        <li>A $100 deposit will be required to secure your appointment date</li>
                                    </ul>
                                </div>
                                
                                <p style="margin: 0 0 10px 0; color: #cccccc; font-size: 16px; line-height: 1.6;">
                                    If you have any questions or need to make changes, please don't hesitate to reach out!
                                </p>
                                
                                <p style="margin: 0; color: #cccccc; font-size: 16px; line-height: 1.6;">
                                    Looking forward to creating your tattoo,<br>
                                    <strong style="color: #a855f7;">Fiona</strong>
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #333;">
                                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                                    <strong style="color: #a855f7;">FIONA.INK</strong> | Custom Tattoo Artistry
                                </p>
                                <p style="margin: 0; color: #666; font-size: 12px;">
                                    fiona.ink@example.com | +1 (555) 123-4567 | Los Angeles, CA
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    
    plain_content = f"""
    FIONA.INK - Booking Confirmed!
    
    Hi {client_name},
    
    Great news! Your tattoo booking has been confirmed. I'm excited to bring your vision to life!
    
    YOUR TATTOO DETAILS:
    {'Placement: ' + body_placement if body_placement else ''}
    {'Size: ' + size if size else ''}
    {'Preferred Date: ' + preferred_date if preferred_date else ''}
    
    Your Idea:
    {tattoo_idea}
    
    WHAT'S NEXT?
    - I'll be in touch within 24-48 hours to finalize the appointment time
    - We'll discuss the design in detail and make any adjustments you'd like
    - A $100 deposit will be required to secure your appointment date
    
    If you have any questions or need to make changes, please don't hesitate to reach out!
    
    Looking forward to creating your tattoo,
    Fiona
    
    ---
    FIONA.INK | Custom Tattoo Artistry
    fiona.ink@example.com | +1 (555) 123-4567 | Los Angeles, CA
    """
    
    return send_email(client_email, subject, html_content, plain_content)
