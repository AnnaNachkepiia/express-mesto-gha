const router = require("express").Router();
const {
  createCard,
  getCard,
  deleteCardbyId,
  likeCard,
  deleteLike,
} = require("../controllers/cards");

router.get("/cards", getCard);
router.delete("/cards/:cardId", deleteCardbyId);
router.post("/cards", createCard);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", deleteLike);

module.exports = router;
