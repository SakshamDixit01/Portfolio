export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['sakshamedu123@gmail.com'],
      reply_to: email,
      subject: `New message from ${name}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`,
    }),
  });

  if (!r.ok) {
    return res.status(500).json({ error: await r.text() });
  }
  return res.status(200).json({ ok: true });
}