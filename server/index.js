require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const cors = require("cors");
const path = require("path");
const { OAuth2Client } = require("google-auth-library");
const { Mistral } = require("@mistralai/mistralai");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const apiKey = process.env.MISTRAL_API_KEY;
const mistralClient = new Mistral({ apiKey: apiKey });

const uri = process.env.MONGODB_URI;
const mongoClient = new MongoClient(uri);
const database = mongoClient.db("logs");
const logs = database.collection("logs");

// Serve static files from the client build
app.use(express.static(path.join(__dirname, "../client/dist")));

// Serve frontend for all other routes
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    console.log("Got this:", email);

    // You can now:
    // - Look up user in DB with `sub` (Google user ID) or `email`
    // - Create a new user if they don't exist
    // - Start a session or issue your own JWT/cookie
    const docs = await logs.find({ user: email }).toArray();

    res.json({
      message: "Google login successful",
      user: { email, name, picture },
      logs: docs,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

app.post("/api/task", async (req, res) => {
  const { task, email } = req.body;

  try {
    const chatResponse = await mistralClient.chat.complete({
      model: "mistral-large-latest",
      messages: [
        {
          role: "system",
          content: `The user will submit a short description of something they accomplished today. Your job is to respond like a 
            hype-man-frat-bro, who celebrates the accomplishment in an overkill way no matter how small/trivial the task was. 
            Keep you response to 1-2 sentences, and feel free to mix in some swear words. For example, if the user says 
            'Did my laundry', you could respond like 'Let's goooooo, you fucking demolished that laundry!!!'`,
        },
        { role: "user", content: task },
      ],
    });

    await logs.insertOne({
      user: email,
      message: task,
      timestamp: (() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })(),
    });
    const docs = await logs.find({ user: email }).toArray();

    res.json({
      message: chatResponse.choices[0].message.content,
      logs: docs,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Error getting AI response" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
