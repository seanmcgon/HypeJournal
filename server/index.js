const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

const app = express();
app.use(cors());
app.use(express.json());
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // You can now:
    // - Look up user in DB with `sub` (Google user ID) or `email`
    // - Create a new user if they don't exist
    // - Start a session or issue your own JWT/cookie

    // For demo:
    res.json({
      message: "Google login successful",
      user: { email, name, picture },
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
