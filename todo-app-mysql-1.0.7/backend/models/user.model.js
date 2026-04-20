const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
    // validate: {
    //   isEmail: true
    // }
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
const User = mongoose.model('User', userSchema);

module.exports = { User };

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
