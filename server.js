require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const User = require("./models/User");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err.message));
}

app.get("/api", (req, res) => {
  res.json({ message: "Real-Time Chat API is running" });
});

app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username and password are required" });
    if (password.length < 6)
      return res.status(400).json({ message: "Password must contain at least 6 characters" });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username and password are required" });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || "development-secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(100);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Could not load messages" });
  }
});

io.on("connection", socket => {
  console.log("User connected:", socket.id);

  socket.on("join", username => {
    socket.username = username;
    io.emit("systemMessage", { message: `${username} joined the chat` });
  });

  socket.on("chatMessage", async data => {
    try {
      if (!data.username || !data.message) return;
      const message = await Message.create({
        username: data.username,
        message: data.message
      });
      io.emit("chatMessage", message);
    } catch (error) {
      console.error("Message error:", error.message);
    }
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("systemMessage", { message: `${socket.username} left the chat` });
    }
  });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}
module.exports = { app, server };