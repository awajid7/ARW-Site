export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { Resend } = await import('resend');
  const resend = new Resend('re_e7Yd2nYU_DoJifX4HCJvZHnVvcmxm2bUG'); // Replace with your actual key

  try {
    const { fullName, email, countryCode, phoneNumber, serviceCategory, subService, message } = req.body;

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${countryCode} ${phoneNumber}</p>
      <p><strong>Service Category:</strong> ${serviceCategory}</p>
      <p><strong>Sub-Service:</strong> ${subService || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No message provided'}</p>
    `;

    await resend.emails.send({
      from: 'contact@arrowconsolidated.com', // Replace with your verified domain
      to: 'ali@arrowconsolidated.com.com', // Replace with where you want to receive emails
      subject: `New Contact: ${fullName}`,
      html: emailContent,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}