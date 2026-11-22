const escapeHtml = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { senderName, senderEmail, senderMessage } = req.body || {};

  if (!senderName || !senderMessage) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Server email key is not configured.' });
  }

  const payload = {
    from: 'Portfolio <onboarding@resend.dev>',
    to: ['sakshamedu123@gmail.com'],
    subject: `New portfolio message from ${senderName}`,
    html: `
      <p><b>Name:</b> ${escapeHtml(senderName)}</p>
      <p><b>Email:</b> ${escapeHtml(senderEmail) || 'Not provided'}</p>
      <p><b>Message:</b></p>
      <p>${escapeHtml(senderMessage).replace(/\n/g, '<br>')}</p>
    `,
  };

  if (senderEmail) payload.reply_to = senderEmail;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Resend error:', detail);
      return res.status(500).json({ error: 'Email could not be sent.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Email could not be sent.' });
  }
}
