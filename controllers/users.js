const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_ERROR,
} = require("../errors/errorCode");

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: "Неправильные почта или пароль" });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      } else {
        res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" });
      }
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND)
          .send({ message: "Запрашиваемый пользователь не найден" });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные пользователя" });
      } else {
        res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" });
      }
    });
};

const getUserInfo = (req, res) => {
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      res
        .status(NOT_FOUND)
        .send({ message: "Запрашиваемый пользователь не найден" });
    } else {
      res.status(200).send(user);
    }
  })
.catch(() => {
  res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" });
})
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.status(201).send({ user }))
      .catch((err) => {
        if (err.name === "ValidationError") {
          res.status(BAD_REQUEST).send({
            message: "Переданы некорректные данные при создании пользователя",
          });
        } else {
          res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" });
        }
      });
  });
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND)
          .send({ message: "Пользователь с указанным _id не найден" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: " Переданы некорректные данные при обновлении профиля",
        });
      } else {
        res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" });
      }
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .then((userAvatar) => {
      if (!userAvatar) {
        res
          .status(NOT_FOUND)
          .send({ message: "Пользователь с указанным _id не найден" });
      } else {
        res.status(200).send({ userAvatar });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: " Переданы некорректные данные при обновлении аватара",
        });
      } else {
        res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports = {
  login,
  getUsers,
  getUserById,
  getUserInfo,
  createUser,
  updateProfile,
  updateAvatar,
};
