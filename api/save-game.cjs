// api/save-game.cjs

const supabase = require('../lib/supabase.cjs');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userId, gameData } = req.body;

    if (!userId || !gameData) {
      return res.status(400).json({ error: 'Missing userId or gameData' });
    }

    const { data, error } = await supabase
      .from('games')
      .insert([{ user_id: userId, game_data: gameData }]);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};