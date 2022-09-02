const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { NotFound } = require('../errors/NotFound');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(
        /https?:\/\/(www\.)?([-a-zA-Z0-9()@:%_+.~#?&=]*)\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.use(auth);

router.use('/', usersRouter);
router.use('/', cardsRouter);
router.use('/*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
