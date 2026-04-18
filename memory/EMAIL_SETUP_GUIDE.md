# Email Notification Setup Guide

## Overview
The Fiona.Ink website includes automatic email notifications for booking confirmations. When an admin confirms a booking, the client automatically receives a beautiful HTML email with their booking details.

## Current Status
✅ Email system implemented and ready
🔄 SMTP credentials not configured (emails won't send until configured)

## Email Features
- **Beautiful HTML emails** with Fiona.Ink branding
- **Automatic sending** when booking status changes to "confirmed"
- **Professional design** with dark theme and neon accents
- **Booking details included**: tattoo idea, placement, size, preferred date
- **Plain text fallback** for email clients that don't support HTML

## How to Enable Email Notifications

### Option 1: Gmail SMTP (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings → Security → 2-Step Verification
   - Scroll to "App passwords"
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Update `/app/backend/.env` file**:
```bash
# Uncomment and configure these lines:
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-16-char-app-password"
FROM_EMAIL="your-email@gmail.com"
FROM_NAME="Fiona.Ink"
```

4. **Restart backend server**:
```bash
sudo supervisorctl restart backend
```

### Option 2: Professional Email Service (Recommended for Production)

**SendGrid** (Free tier: 100 emails/day):
```bash
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
FROM_EMAIL="noreply@yourdomain.com"
FROM_NAME="Fiona.Ink"
```

**Mailgun** (Free tier: 5,000 emails/month):
```bash
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
SMTP_USER="postmaster@your-domain.mailgun.org"
SMTP_PASSWORD="your-mailgun-password"
FROM_EMAIL="noreply@yourdomain.com"
FROM_NAME="Fiona.Ink"
```

**AWS SES** (Very reliable, low cost):
```bash
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_PORT="587"
SMTP_USER="your-ses-smtp-username"
SMTP_PASSWORD="your-ses-smtp-password"
FROM_EMAIL="noreply@yourdomain.com"
FROM_NAME="Fiona.Ink"
```

## Testing Email Notifications

### Quick Test
1. Configure SMTP credentials as shown above
2. Restart backend: `sudo supervisorctl restart backend`
3. Login to admin dashboard: https://your-domain.com/admin/login
4. Find a booking with status "pending"
5. Click "Confirm" button
6. Check recipient's email inbox (and spam folder)

### Check Logs
```bash
# View backend logs for email status
tail -f /var/log/supervisor/backend.err.log | grep -i email
```

You should see:
- `"Confirmation email sent to client@email.com"` (success)
- `"SMTP credentials not configured"` (if not configured)
- `"Failed to send email"` (if configuration is wrong)

## Email Template Preview

The confirmation email includes:
- **Header**: Fiona.Ink branding with gradient
- **Confirmation message**: "Booking Confirmed! ✓"
- **Booking details table**: All tattoo information
- **Next steps section**: What happens next
- **Footer**: Contact information

## Troubleshooting

### Emails not sending?
1. Check SMTP credentials in `/app/backend/.env`
2. Verify backend restarted after configuration
3. Check backend logs: `tail -f /var/log/supervisor/backend.err.log`
4. Test with a simple Gmail account first

### Emails going to spam?
1. Use a verified sender email address
2. Add SPF/DKIM records (for production domain)
3. Use professional email service (SendGrid, Mailgun)
4. Avoid spam trigger words in email content

### Gmail "Less secure app" error?
- Gmail no longer supports "less secure apps"
- **Solution**: Use App Passwords (requires 2FA enabled)
- Or use SendGrid/Mailgun instead

## Production Recommendations

1. **Use professional email service** (SendGrid/Mailgun/SES)
2. **Verify sender domain** to avoid spam
3. **Monitor email delivery** rates
4. **Set up email webhook** for delivery status
5. **Customize email template** with your actual business info

## Customizing Email Content

Email template location: `/app/backend/app/utils/email.py`

You can customize:
- Email subject line
- Header colors and branding
- Message content
- Footer contact information
- Add your logo/images

## Cost Estimates

- **Gmail**: Free (with app password)
- **SendGrid**: Free tier 100/day, then $15/month
- **Mailgun**: Free tier 5,000/month, then $15/month  
- **AWS SES**: $0.10 per 1,000 emails (very cheap)

## Current Configuration

Check current email configuration:
```bash
grep -E "SMTP_|FROM_" /app/backend/.env
```

If lines are commented out (start with #), emails are disabled.

## Security Notes

- Never commit SMTP credentials to version control
- Use app-specific passwords, not account passwords
- Rotate credentials if compromised
- Use environment variables for all sensitive data

---

**Need Help?**
- Check backend logs for specific error messages
- Test with a simple Gmail account first
- Verify credentials are correct and uncommented
- Ensure backend server restarted after configuration changes
