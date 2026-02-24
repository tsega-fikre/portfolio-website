# EmailJS Setup Guide

Follow these steps to configure the contact form to send emails directly to your inbox.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the connection instructions
5. Note your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

**Subject:**
```
New Contact from {{user_name}}
```

**Content:**
```
You have received a new message from your portfolio website.

Name: {{user_name}}
Email: {{user_email}}

Message:
{{message}}
```

4. Save the template
5. Note your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `abcXYZ123`)

## Step 5: Update Contact Component

Open `src/components/Contact.jsx` and replace these values:

```javascript
emailjs.sendForm(
  'service_abc123',      // Your Service ID
  'template_xyz789',     // Your Template ID
  formRef.current,
  'abcXYZ123'           // Your Public Key
)
```

## Step 6: Test the Form

1. Run your development server: `npm run dev`
2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your email inbox (including spam folder)

## Troubleshooting

### Not receiving emails?

1. Check your EmailJS dashboard for failed requests
2. Verify all IDs are correct
3. Check spam/junk folder
4. Ensure email service is properly connected
5. Check browser console for errors

### Rate Limits

Free EmailJS accounts have limits:
- 200 emails/month
- 2 emails/second

For higher limits, upgrade to a paid plan.

## Alternative: Direct Email Link

If you prefer not to use EmailJS, you can replace the form with a simple mailto link:

```jsx
<a 
  href="mailto:tsegazaebfikre12@gmail.com?subject=Portfolio Contact"
  className="px-8 py-4 bg-cyber-green text-black font-bold rounded-lg"
>
  Email Me
</a>
```

## Security Note

Your EmailJS public key is safe to expose in client-side code. It only allows sending emails through your configured template, not accessing your email account.
