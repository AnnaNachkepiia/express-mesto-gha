const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  createCard,
  getCard,
  deleteCardbyId,
  likeCard,
  deleteLike,
} = require("../controllers/cards");

router.get("/cards", getCard);
router.delete("/cards/:cardId", deleteCardbyId);
router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required,
      link: Joi.string().required,
    }),
  }),
  createCard,
);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", deleteLike);

module.exports = router;
