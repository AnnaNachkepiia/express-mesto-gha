const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
      } else {
        res.status(200).send(user);
      }
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (user === null) {
        res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
      }
      {
        res.status(201).send({ user });
      }
    })
    .catch(() => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: " Переданы некорректные данные при обновлении профиля",
        });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((userAvatar) => {
      if (userAvatar === null) {
        res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
      } else {
        res.status(201).send({ user });
      }
    })
    .catch(() => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: " Переданы некорректные данные при обновлении аватара",
        });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};
