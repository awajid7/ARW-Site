export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY); // safer with env vars

  try {
    // Match these to your form field names
    const { name, email, countryCode, phone, service_category, specific_service, message } = req.body;

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${countryCode || ''} ${phone || ''}</p>
      <p><strong>Service Category:</strong> ${service_category}</p>
      <p><strong>Sub-Service:</strong> ${specific_service || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No message provided'}</p>
    `;

    await resend.emails.send({
      from: 'contact@arrowconsolidated.com', // must be a verified sender domain in Resend
      to: 'ali@arrowconsolidated.com', // fixed typo
      subject: `New Contact: ${name}`,
      html: emailContent,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
