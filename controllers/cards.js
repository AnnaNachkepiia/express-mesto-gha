const Card = require("../models/card");
const { BadRequest, NotFound, Forbidden } = require("../errors/errorName");

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCardbyId = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound("Карточка с указанным _id не найдена");
      } else if (card.owner.toString !== req.user._id) {
        throw new Forbidden("Эту карточку удалить невозможно");
      } else {
        res.status(200).send({ card });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Запрашиваемая карточка не найдена"));
        return;
      }
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const {
    name, link, likes, createdAt,
  } = req.body;
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
        next(
          new BadRequest("Переданы некорректные данные при создании карточки"),
        );
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound("Передан несуществующий _id карточки");
      } else {
        res.status(200).send({ card });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BadRequest("Переданы некорректные данные для постановки лайка"),
        );
      }
      next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound("Передан несуществующий _id карточки");
      } else {
        res.status(200).send({ card });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Переданы некорректные данные для снятия лайка"));
        return;
      }
      next(err);
    });
};
