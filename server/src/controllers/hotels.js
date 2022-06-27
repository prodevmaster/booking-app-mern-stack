const Hotel = require("../models/Hotel");
//CREATE
const createHotel = async (req, res, next) => {
  const body = req.body;
  try {
    const newHotel = await Hotel.create(body);
    res.status(201).send(newHotel);
  } catch (e) {
    next(e);
  }
};
//GET ALL
const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min - 1 || 1, $lt: Number(max) + 1 || 999 },
    }).limit(req.query.limit);
    res.status(200).send(hotels);
  } catch (e) {
    next(e);
  }
};
//GET
const getHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).send(hotel);
  } catch (e) {
    next(e);
  }
};
//UPDATE
const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(201).send(updatedHotel);
  } catch (e) {
    next(e);
  }
};
//DELETE
const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).send({ message: "hotel has been deleted!" });
  } catch (e) {
    next(e);
  }
};

// Featured
const getCountByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).send(list);
  } catch (e) {
    next(e);
  }
};

const getCountByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).send([
      {
        type: "hotels",
        count: hotelCount,
      },
      {
        type: "apartments",
        count: apartmentCount,
      },
      {
        type: "resorts",
        count: resortCount,
      },
      {
        type: "villas",
        count: villaCount,
      },
      {
        type: "cabins",
        count: cabinCount,
      },
    ]);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotel,
  getCountByCity,
  getCountByType,
};
