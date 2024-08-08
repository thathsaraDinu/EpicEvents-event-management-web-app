const express = require("express");
const mongoose = require("mongoose");
const Event = require("./models/eventModel");
const cors = require("cors");
const multer = require("multer");
const uri =
  "mongodb+srv://thathsaradinuwan:Dinuwan@cluster0.67pv9xt.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const controller = require("./controllers/controller");
const promotioncontroller = require("./controllers/promotionController")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Unique filename
  },
});
const port = process.env.PORT || 3001;
const host = port === 3001 ? "localhost" : "0.0.0.0";
const upload = multer({ storage: storage });

app.use("/images", express.static("uploads"));

app.listen(port, host, () => {
  console.log("Server started on 3001");
});

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("MongoDB error", error);
  }
};

connect();

app.get("/events", async (req, res) => {
  controller.getEvents(req, res);
});

app.post("/eventcreate", upload.single("image"), async (req, res) => {
  controller.createEvent(req, res);
});


app.post("/eventDelete/:id", async (req, res) => {
  controller.deleteEvent(req, res);
});

app.post("/updateEvent/:id", async (req, res) => {
  controller.updateEvent(req, res);
});

app.get("/getEventById/:id", async (req, res) => {
  controller.getEventsById(req, res);
});

app.post("/createpromotion", async (req, res) => {
  promotioncontroller.createPromotion(req, res);
});

app.get("/discountpromotions", async (req, res) => {
  promotioncontroller.getAllDiscounts(req, res);
});
app.get("/discountamounts", async (req, res) => {
  promotioncontroller.getAllFreeGifts(req, res);
});