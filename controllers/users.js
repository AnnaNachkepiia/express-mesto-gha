const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_ERROR,
} = require("../errors/errorCode");

module.exports.getUsers = (req, res) => {
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

module.exports.getUserById = (req, res) => {
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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
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

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
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
