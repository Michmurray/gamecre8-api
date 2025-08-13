// api/create.js (CommonJS for Vercel Node 18)
module.exports = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch {}
    }
    const prompt = (body && body.prompt ? String(body.prompt) : '').trim();
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

    // Placeholder success payload (we’ll swap in Supabase upload next)
    return res.status(200).json({
      success: true,
      message: `Game would be created from prompt: ${prompt}`,
      id: Math.random().toString(36).slice(2, 10)
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal error' });
  }
};
