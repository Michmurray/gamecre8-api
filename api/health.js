// api/health.js
module.exports = (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ ok: true, time: new Date().toISOString() }));
};
