const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

//CREATE
const createRoom = async (req, res, next) => {
  const { hotelId } = req.params;
  const body = req.body;
  try {
    const newRoom = await Room.create(body);
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } });
    res.status(201).send(newRoom);
  } catch (e) {
    next(e);
  }
};
//GET ALL
const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  } catch (e) {
    next(e);
  }
};
//GET ONE
const getRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    res.status(200).send(room);
  } catch (e) {
    next(e);
  }
};
//UPDATE ONE
const updateRoom = async (req, res, next) => {
  const { id, hotelId } = req.params;
  const body = req.body;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(200).send(updatedRoom);
  } catch (e) {
    next(e);
  }
};
// update Room availability
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
//DELETE ONE
const deleteRoom = async (req, res, next) => {
  const { roomId, hotelId } = req.params;
  try {
    await Room.findByIdAndDelete(roomId);
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
    res.status(200).send("room has been deleted!");
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
};
