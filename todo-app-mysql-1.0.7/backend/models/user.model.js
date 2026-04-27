const mongoose = require('mongoose');

const emailRegex =
  /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegex]
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  address: {
    type: String
  },
  zip: {
    type: Number
  },
  location: {
    type: String
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('user', {
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     name: {
//       type: DataTypes.STRING
//     },
//     address: {
//       type: DataTypes.STRING
//     },
//     zip: {
//       type: DataTypes.INTEGER
//     },
//     location: {
//       type: DataTypes.STRING
//     }
//   });
//   return User;
// };
