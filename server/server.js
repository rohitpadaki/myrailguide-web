const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.ATLAS_URI);

const database = client.db("myrailguide"); // Replace with your database name

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/train/:id", async (req, res) => {
  const trainno = req.params.id;

  try {
    const collection = database.collection("train");
    const trains = await collection.find({ trainno: trainno }).toArray();

    if (trains.length === 0) {
      return res.status(404).json({ message: "Train not found" });
    }

    res.json(trains[0]);
  } catch (error) {
    console.error("Error fetching train data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/pnrstatus/:id", async (req, res) => {
  const pnrno = req.params.id;

  try {
    const collection = database.collection("pnr");
    const pnr = await collection.find({ pnrno: pnrno }).toArray();

    if (pnr.length === 0) {
      return res.status(404).json({ message: "PNR not found" });
    }

    res.json(pnr[0]);
  } catch (error) {
    console.error("Error fetching pnr data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/chatbot", async (req, res) => {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.GENAI_API);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction:
      "You are a chatbot that is used in app called MyRailGuide. Your task is to respond to queries related to Trains, stations and anything related to railways. Provide the response without using Markdown. Do not split response. Answer in one go",
  });

  const chat = model.startChat({
    history: req.body.history,
  });

  const msg = req.body.text;
  try {
    const result = await chat.sendMessage(msg);
    const response = result.response;
    const text = response.text();
    res.json(text);
  } catch (error) {
    console.log(error);
  }
  // res.json("Working");
});

app.get("/qrcode/:id", async (req, res) => {
  const ticketId = req.params.id;
  try {
    const collection = database.collection("ticket");
    const tid = await collection.find({ ticketId: ticketId }).toArray();

    if (tid.length == 0) {
      return res.status(404).json({ message: "QR Code not found" });
    }
    res.json(tid[0]);
  } catch (error) {
    console.error("Error fetching ticket data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  const collection = database.collection("users");

  const userData = {
    email: req.body.email,
    password: req.body.pass, // Make sure to hash the password before storing
  };
  try {
    const already = await collection.findOne({ email: userData.email });
    if (already != null) {
      console.log(already);
      res.json({ operation: "exists" });
    } else {
      const result = await collection.insertOne(userData);
      console.log("User inserted:", result.insertedId);
      res.json({ operation: "success" });
    }
  } catch (error) {
    console.error("Error inserting user:", error);
  } finally {
    // Optional: Close the connection if needed
    // await client.close();
  }
});

app.post("/login", async (req, res) => {
  const collection = database.collection("users");
  const userData = {
    email: req.body.email,
    password: req.body.pass, // Make sure to hash the password before storing
  };
  try {
    const result = await collection.find(userData).toArray();

    console.log(result);
    if (result.length == 0) {
      console.log("Logged in failed");
      res.json({ login: "invalid" });
    } else {
      console.log("Logged in");
      res.json({ login: "valid" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  } finally {
  }
});
