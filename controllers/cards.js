const Card = require("../models/card");

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.deleteCardbyId = (req, res) => {
  Card.findByIdAndRemove(req.params.userId)
    .orFail(new Error("NoValidId"))
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === "NoValidId") {
        res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена" });
      } else if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные для удаления карточки",
        });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

//     .then((card) => {
//       if (card === null) {
//         res
//           .status(400)
//           .send({ message: "Карточка с указанным _id не найдена" });
//       } else {
//         res.status(200).send({ card });
//       }
//     })
//     .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
// };

module.exports.createCard = (req, res) => {
  const { name, link, likes, createdAt } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner, likes, createdAt })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(new Error("NoValidId"))
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === "NoValidId") {
        res
          .status(404)
          .send({ message: "Передан несуществующий _id карточки" });
      } else if (err.name === "CastError") {
        res.status(400).send({
          message: "Переданы некорректные данные для постановки лайка",
        });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

//     .then((card) => {
//       if (card === null) {
//         res
//           .status(404)
//           .send({ message: "Передан несуществующий _id карточки" });
//       } else {
//         res.status(200).send({ card });
//       }
//     })
//     .catch((err) => {
//       if (err.name === "CastError") {
//         res.status(400).send({
//           message: "Переданы некорректные данные для постановки лайка",
//         });
//       } else {
//         res.status(500).send({ message: "Произошла ошибка" });
//       }
//     });
// };

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(new Error("NoValidId"))
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === "NoValidId") {
        res
          .status(404)
          .send({ message: "Передан несуществующий _id карточки" });
      } else if (err.name === "CastError") {
        res.status(400).send({
          message: "Переданы некорректные данные для снятия лайка",
        });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};
