import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const port = process.env.PORT || 3005;
//set up mongoose
var streamSchema = new mongoose.Schema({}, { strict: false });
const Stream = mongoose.model("Stream", streamSchema);
mongoose.connect(
  process.env.MONGO_URL || `mongodb://localhost:27017/management`
);
var db = mongoose.connection;
db.on("error", e => {
  console.error.bind(console, "connection error:");
  process.exit(1);
});
db.once("open", function() {
  console.log("connected to mongodb");
});

//set up express
const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
});

//endpoints
app.get("/rooms/:id", async (req, res) => {
  try {
    const doc = await Room.findById({ _id: req.params.id });
    if (doc === null) {
      res.status(404);
      return res.end();
    }
    res.status(201);
    res.json(doc);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: e.message, stack: e.stack });
  }
});
app.get("/rooms", async (req, res) => {
  try {
    const docs = await Room.find(req.query);
    res.status(201);
    res.json(docs);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: e.message, stack: e.stack });
  }
});

app.post("/rooms", async (req, res) => {
  try {
    const doc = await Room.create({ ...req.body, createdAt: Date.now() });

    res.status(201);
    res.json(doc);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: e.message, stack: e.stack });
  }
});

app.put("/rooms/:id", async (req, res) => {
  try {
    const doc = await Room.findByIdAndUpdate({ _id: req.params.id }, req.body);
    if (doc === null) {
      res.status(404);
      return res.end();
    }
    res.status(201);
    res.json(doc);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: e.mesage, stack: e.stack });
  }
});

app.delete("/rooms/:id", async (req, res) => {
  try {
    const doc = await Room.findByIdAndDelete({ _id: req.params.id });
    if (doc === null) {
      res.status(404);
      return res.end();
    }
    res.status(204);
    res.json(doc);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: e.message, stack: e.stack });
  }
});

app.listen(port, () => console.log(`Ario cloud listening on port ${port}!`));
