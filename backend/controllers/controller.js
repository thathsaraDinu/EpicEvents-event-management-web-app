const Event = require("../models/eventModel");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.json(events);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createEvent = async (req, res) => {
  try {
    console.log(req.body.name);

    const {
      name: eventName,
      date: eventDate,
      time: eventTime,
      desc: eventDesc,
      country: eventCountry,
      city: eventCity,
      address: eventAddress,
    } = req.body;

    let eventPhoto;
    if (req.file) eventPhoto = `${req.file.filename}`;

    if (!eventName || !eventDate || !eventDesc || !eventCountry || !eventCity) {
      return res
        .status(400)
        .json({ status: 400, message: "Please Fill the required fields" });
    }

    console.log("check1" + req.body.name);
    const prEventID = await Event.findOne().sort({ _id: -1 });
    let eventId;
    if (prEventID) eventId = prEventID.eventId + 1;
    else eventId = 10010;

    const newEvent = new Event({
      eventId,
      eventName,
      eventDate,
      eventTime,
      eventDesc,
      eventCountry,
      eventCity,
      eventAddress,
      eventPhoto,
    });

    const savedEvent = await newEvent.save();

    res.status(200).json({ status: 200, savedEvent });
  } catch (e) {
    res.status(500).json({ status: 500, e });
  }
};

const deleteEvent = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete({ _id })
    .then(() => {
      res.status(200).json({});
    })
    .catch((e) => {
      res.status(500).json();
    });
};

const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      eventName,
      eventDate,
      eventTime,
      eventDesc,
      eventCountry,
      eventCity,
      eventAddress,
      eventPhoto,
    } = req.body;

    const event = await Event.findByIdAndUpdate(id,
      {
      eventName,
      eventDate,
      eventTime,
      eventDesc,
      eventCountry,
      eventCity,
      eventAddress,
      eventPhoto}
    );
    console.log("bl", event)

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json();
  }

};

const getEventsById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    console.log(event)

    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getEventsById = getEventsById;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.createEvent = createEvent;
exports.getEvents = getEvents;
