import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createUser, authenticateUser } from "./db.js";
import jwt from "jsonwebtoken"; // Import jsonwebtoken package

dotenv.config();

const app = express();

// Use bodyParser middleware to parse request bodies
app.use(bodyParser.json());

// Use cors middleware to enable CORS
app.use(cors());

// Endpoint to handle user registration
app.post("/auth/register", async (req, res) => {
  const user = req.body;
  // Perform any necessary validation or processing here
  // For simplicity, we'll just log the received data
  console.log("Received registration data:", user);

  await createUser(user);

  res.status(200).json({ message: "User registration successful" });
});

// Endpoint to handle user login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email and password in the database
    const user = await authenticateUser(email, password);

    if (user) {
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      // Respond with token
      res.status(200).json({ token });
    } else {
      // User not found or incorrect password
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
