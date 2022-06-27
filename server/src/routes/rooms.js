const { Router } = require("express");
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
} = require("../controllers/rooms");
const { verifyAdmin } = require("../middlewares/users");
const router = Router();

//CREATE
router.post("/:hotelId", verifyAdmin, createRoom);
//GETALL
router.get("/", getRooms);
//GET
router.get("/:id", getRoom);
//UPDATE
router.patch("/:id", verifyAdmin, updateRoom);
// UPDATE ROOM AVAILABILITY
router.patch("/availability/:id", updateRoomAvailability);
//DELETE
router.delete("/:hotelId/:roomId", verifyAdmin, deleteRoom);

module.exports = router;
