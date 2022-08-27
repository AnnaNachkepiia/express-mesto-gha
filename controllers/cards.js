const Card = require("../models/card");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_ERROR,
} = require("../errors/errorCode");

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() =>
      res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" })
    );
};

module.exports.deleteCardbyId = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND)
          .send({ message: "Карточка с указанным _id не найдена" });
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Запрашиваемая карточка не найдена",
        });
      } else {
        res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link, likes, createdAt } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
    likes,
    createdAt,
  })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      } else {
        res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND)
          .send({ message: "Передан несуществующий _id карточки" });
      } else {
        res.status(200).send({ card });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Переданы некорректные данные для постановки лайка",
        });
      } else {
        res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND)
          .send({ message: "Передан несуществующий _id карточки" });
      } else {
        res.status(200).send({ card });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Переданы некорректные данные для снятия лайка",
        });
      } else {
        res.status(INTERNAL_ERROR).send({ message: "Произошла ошибка" });
      }
    });
};
