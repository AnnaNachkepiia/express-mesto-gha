const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regexUrl = require('../consts/regex');
const {
  createCard,
  getCard,
  deleteCardbyId,
  likeCard,
  deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCard);
router.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteCardbyId,
);
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().regex(regexUrl),
    }),
  }),
  createCard,
);
router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteLike,
);

module.exports = router;
