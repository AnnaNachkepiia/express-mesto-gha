const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: { validator: validator.isURL },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: { validator: validator.isEmail },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function Auth(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then(async (user) => {
      if (!user) {
        return Promise.reject(
          new Unauthorized('Неправильные почта или пароль'),
        );
      }

      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return Promise.reject(
          new Unauthorized('Неправильные почта или пароль'),
        );
      }
      return user;
    });
};

module.exports = mongoose.model('user', userSchema);
