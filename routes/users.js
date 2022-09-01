const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
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
router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(
        /https?:\/\/(www\.)?([-a-zA-Z0-9()@:%_+.~#?&=]*)/,
      ),
    }),
  }),
  updateAvatar,
);

module.exports = router;
