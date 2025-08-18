# Email Troubleshooting Guide

## Why Emails Might Not Reach Clients

### 1. **Missing Environment Variables**

The most common issue is missing or incorrect environment variables.

**Create a `.env` file in your root directory:**

```env
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=your_verified_email@domain.com
FROM_NAME=BillAlert
PORT=5000
```

**Get your Resend API key:**

1. Go to [resend.com](https://resend.com)
2. Sign up/Login
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

### 2. **Email Sender Configuration**

- The "from" email must be verified in your Resend account
- Use a domain you own or verify your email address
- Default fallback: `noreply@billalert.com`

### 3. **Cron Schedule Timing**

- Current schedule: `03 21 * * *` (9:03 PM daily)
- Your server must be running at this time
- Check server logs for cron execution

### 4. **Database Issues**

- Ensure clients exist in the database
- Verify client emails are correct
- Check if bills have valid `clientId` references

## Testing Your Email System

### Option 1: Use the Test Script

```bash
# Update test-email.js with your email
node test-email.js
```

### Option 2: Use the Test API Routes

```bash
# Check email configuration
GET /test/email-config

# Send test email
POST /test/send-test-email
{
  "email": "your-email@example.com",
  "name": "Your Name"
}

# Send reminder for specific bill
POST /test/send-reminder/:billId
```

### Option 3: Manual Testing

1. Start your server
2. Check console logs for "Resend initialized successfully"
3. Look for cron job execution logs
4. Monitor for email sending logs

## Common Error Messages & Solutions

### "RESEND_API_KEY is not configured"

- Create `.env` file with your API key
- Restart server after adding environment variables

### "Failed to initialize Resend"

- Check if API key is valid
- Verify internet connection
- Ensure Resend service is accessible

### "Email sent successfully" but no email received

- Check spam/junk folder
- Verify sender email is correct
- Check Resend dashboard for delivery status
- Ensure recipient email is valid

### "Client not found for bill"

- Verify bills have valid `clientId`
- Check if clients exist in database
- Ensure proper data relationships

## Debugging Steps

1. **Check Environment Variables**

   ```bash
   echo $RESEND_API_KEY
   ```

2. **Verify Server Logs**

   - Look for "Resend initialized successfully"
   - Check for cron job execution logs
   - Monitor email sending attempts

3. **Test Database Connections**

   - Ensure MongoDB is running
   - Verify client and bill data exists
   - Check data relationships

4. **Test Email Manually**
   - Use test routes to send emails immediately
   - Verify Resend API key works
   - Check email delivery status

## Resend Dashboard Monitoring

1. **Login to Resend Dashboard**
2. **Check Activity Logs**

   - See all email attempts
   - Monitor delivery status
   - Check for bounces or failures

3. **Verify Domain/Email**
   - Ensure sender email is verified
   - Check domain authentication if using custom domain

## Alternative Testing

If emails still don't work:

1. **Check Resend Account Status**

   - Verify account is active
   - Check API usage limits
   - Ensure no account restrictions

2. **Test with Different Email**

   - Try sending to a different email address
   - Use Gmail, Outlook, or other providers
   - Check if it's a specific email issue

3. **Network/Firewall Issues**
   - Ensure server can reach Resend API
   - Check firewall settings
   - Verify proxy configurations

## Getting Help

If you're still having issues:

1. **Check Resend Documentation**: [docs.resend.com](https://docs.resend.com)
2. **Review Server Logs**: Look for specific error messages
3. **Test API Key**: Use Resend's test endpoint
4. **Contact Support**: Reach out to Resend support if needed

## Quick Fix Checklist

- [ ] Created `.env` file with `RESEND_API_KEY`
- [ ] Verified sender email in Resend
- [ ] Restarted server after environment changes
- [ ] Checked server logs for initialization
- [ ] Verified database has clients and bills
- [ ] Tested with manual email sending
- [ ] Checked spam/junk folders
- [ ] Monitored Resend dashboard
