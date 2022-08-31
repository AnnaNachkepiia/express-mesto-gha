const router = require("express").Router();
const {
  // createUser,
  getUserById,
  getUsers,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/me", getUserInfo);
router.get("/users/:userId", getUserById);
// router.post("/users", createUser);
router.patch("/users/me", updateProfile);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
