const { Router } = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { verifyUser, verifyAdmin } = require("../middlewares/users");
const router = Router();

/* // verify the token
router.get("/checkToken", verifyToken, (req, res) => {
  console.log("you are authenticated!");
  res.sendStatus(200);
});
// verify the user
router.get("/checkUser/:id", verifyUser, (req, res) => {
  console.log("you are the admin!");
  res.sendStatus(200);
});
// verify the admin
router.get("/checkAdmin/:id", verifyAdmin, (req, res) => {
  console.log("you are the admin and you can do what ever you want!");
  res.sendStatus(200);
}); */

//GET ALL
router.get("/", verifyAdmin, getUsers);
//GET ONE
router.get("/:id", verifyUser, getUser);
//UPDATE
router.patch("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
