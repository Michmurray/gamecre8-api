// api/create-redirect.js
// GET /api/create-redirect?prompt=...  -> 302 redirects to the generated game URL

module.exports = async (req, res) => {
  try {
    const q = req.query || {};
    const prompt = (q.prompt || "").toString().trim();
    if (!prompt) {
      res.status(400).send("Missing prompt");
      return;
    }

    // Build base URL of this deployment (works in Preview & Prod)
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const selfBase = process.env.SELF_BASE_URL || `https://${host}`;

    // Call your existing create endpoint
    const createRes = await fetch(`${selfBase}/api/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await createRes.json().catch(() => ({}));

    if (createRes.status === 201 && data && data.url) {
      // Redirect to the playable game URL
      res.writeHead(302, { Location: data.url });
      res.end();
      return;
    }

    res
      .status(500)
      .send(
        data?.error ? `Create failed: ${data.error}` : "Create failed: unknown error"
      );
  } catch (err) {
    res.status(500).send(`Server error: ${err.message}`);
  }
};