const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    text: {
      // In SQLite, TEXT is already 'long' by default (for the tests)
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    indexes: [
      // FULLTEXT only exists in MySQL, so disable on SQLite (for the tests)
      ...(isSqlite ? [] : [{ type: 'FULLTEXT', name: 'text_idx', fields: ['text'] }])
    ]
  }
);

return Todo;

// module.exports = (sequelize, DataTypes) => {
//   const isSqlite = sequelize.getDialect() === 'sqlite';

//   const Todo = sequelize.define(
//     'todo',
//     {
//       text: {
//         // In SQLite, TEXT is already 'long' by default (for the tests)
//         type: isSqlite ? DataTypes.TEXT : DataTypes.TEXT('long'),
//         allowNull: false
//       },
//       date: {
//         type: DataTypes.DATEONLY,
//         allowNull: true
//       },
//       completed: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false
//       },
//       user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'users',
//           key: 'id'
//         },
//         onDelete: 'CASCADE'
//       }
//     },
//     {
//       indexes: [
//         // FULLTEXT only exists in MySQL, so disable on SQLite (for the tests)
//         ...(isSqlite ? [] : [{ type: 'FULLTEXT', name: 'text_idx', fields: ['text'] }])
//       ]
//     }
//   );

//   return Todo;
// };
