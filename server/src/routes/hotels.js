const { Router } = require("express");
const {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  getCountByCity,
  getCountByType,
} = require("../controllers/hotels");
const { verifyAdmin } = require("../middlewares/users");
const router = Router();

//CREATE
router.post("/", verifyAdmin, createHotel);
//GETALL
router.get("/", getHotels);
// GET by CITY
router.get("/getCountByCity", getCountByCity);
router.get("/getCountByType", getCountByType);
//GET ONE
router.get("/:id", getHotel);
//UPDATE
router.patch("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//Featured

module.exports = router;
