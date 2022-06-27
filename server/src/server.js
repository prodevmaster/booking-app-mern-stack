const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const usersRoute = require("./routes/users");
const cookieParser = require("cookie-parser");

/* Define the vars */
require("dotenv").config();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3001;

/* Handle the modules that we gonna use */
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use((err, req, res, next) => {
  return res.status(500).send({ error: err.message });
});
/* Handle the server and the database connection */
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("database connected");
    app.listen(PORT);
  })
  .catch((e) => {
    console.log("cannot connect to the database");
    console.log(e.message);
  });
