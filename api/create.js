export default function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    res.status(200).json({
      success: true,
      message: `Game created from prompt: ${prompt}`,
      gameData: { /* placeholder game data */ }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
