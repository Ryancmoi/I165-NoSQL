const cleanTodo = (todo) => {
  const todoObj = todo.toObject ? todo.toObject() : todo;
  const { user_id, __v, ...cleanedTodo } = todoObj;
  return cleanedTodo;
};

const TodoController = {
  createTodo: async (req, res) => {
    const user_id = req.sub;
    const { text, date } = req.body;
    const { Todo } = req.app.locals.models;
    const redis = req.app.locals.redis;
    const cacheKey = `todos:${user_id}`;

    try {
      const result = await Todo.create({
        text: text,
        date: date,
        completed: false,
        user_id: user_id
      });

      if (redis) {
        await redis.del(cacheKey);
      }

      return res.status(201).json(cleanTodo(result));
    } catch (error) {
      console.error('ADD TODO: ', error);
      return res.status(500).send();
    }
  },

  getAllTodo: async (req, res) => {
    const user_id = req.sub;
    const { Todo } = req.app.locals.models;
    const redis = req.app.locals.redis;
    const cacheKey = `todos:${user_id}`;

    try {
      if (redis) {
        const cached = await redis.get(cacheKey);
        if (cached) {
          return res.status(200).json(JSON.parse(cached));
        }
      }

      const result = await Todo.find({ user_id: user_id }).sort({ date: 1 }).select('-user_id');
      const cleanedResult = result.map(todo => cleanTodo(todo));

      if (redis) {
        await redis.setEx(cacheKey, 300, JSON.stringify(cleanedResult));
      }

      return res.status(200).json(cleanedResult);
    } catch (error) {
      console.error('GET ALL TODO: ', error);
      return res.status(500).send();
    }
  },

  editTodo: async (req, res) => {
    const user_id = req.sub;
    const todo_id = req.params.id;
    const data = req.body;
    const { Todo } = req.app.locals.models;
    const redis = req.app.locals.redis;
    const cacheKey = `todos:${user_id}`;

    try {
      const result = await Todo.findOne({ _id: todo_id, user_id: user_id });

      if (result) {
        result.completed = data.completed !== undefined ? data.completed : result.completed;
        result.text = data.text ? data.text : result.text;
        result.date = data.date ? data.date : result.date;

        await result.save();

        if (redis) {
          await redis.del(cacheKey);
        }

        return res.status(200).json(cleanTodo(result));
      } else {
        return res.status(404).send();
      }
    } catch (error) {
      console.error('UPDATE TODO: ', error);
      return res.status(500).send();
    }
  },

  deleteTodo: async (req, res) => {
    const user_id = req.sub;
    const todo_id = req.params.id;
    const { Todo } = req.app.locals.models;
    const redis = req.app.locals.redis;
    const cacheKey = `todos:${user_id}`;

    try {
      const result = await Todo.findOneAndDelete({ _id: todo_id, user_id: user_id });

      if (result) {
        if (redis) {
          await redis.del(cacheKey);
        }

        return res.status(200).json({ _id: todo_id });
      } else {
        return res.status(404).send();
      }
    } catch (error) {
      console.error('DELETE TODO: ', error);
      return res.status(500).send();
    }
  },

  getSearchTodo: async (req, res) => {
    const user_id = req.sub;
    const query = req.query.q;
    const { Todo } = req.app.locals.models;

    try {
      const result = await Todo.find({
        user_id: user_id,
        $text: { $search: query }
      })
        .sort({ date: 1 })
        .select('-user_id');

      if (result && result.length > 0) {
        return res.status(200).json(result.map(todo => cleanTodo(todo)));
      } else {
        return res.status(404).send();
      }
    } catch (error) {
      console.error('SEARCH TODO: ', error);
      return res.status(500).send();
    }
  }
};

module.exports = TodoController;

// const { Sequelize } = require('sequelize');

// const TodoController = {
//   createTodo: async (req, res) => {
//     const user_id = req.sub;
//     const { text, date } = req.body;
//     const { Todo } = req.app.locals.models;

//     await Todo.create({
//       text: text,
//       date: date,
//       completed: false,
//       user_id: user_id
//     })
//       .then((result) => {
//         return res.status(201).json(result);
//       })
//       .catch((error) => {
//         console.error('ADD TODO: ', error);
//         return res.status(500);
//       });
//   },
//   getAllTodo: async (req, res) => {
//     const user_id = req.sub;
//     const { Todo } = req.app.locals.models;

//     await Todo.findAll({
//       where: { user_id: user_id },
//       order: [['date', 'ASC']],
//       attributes: { exclude: ['user_id'] }
//     })
//       .then((result) => {
//         if (result) {
//           return res.status(200).json(result);
//         } else {
//           return res.status(404);
//         }
//       })
//       .catch((error) => {
//         console.error('GET ALL TODO: ', error);
//         return res.status(500);
//       });
//   },
//   editTodo: async (req, res) => {
//     const user_id = req.sub;
//     const query = { id: req.params.id, user_id: user_id };
//     const data = req.body;
//     const { Todo } = req.app.locals.models;

//     const result = await Todo.findOne({ where: query });
//     if (result) {
//       result.completed = data.completed ? data.completed : false;
//       result.text = data.text ? data.text : result.text;
//       result.date = data.date ? data.date : result.date;
//       await result
//         .save()
//         .then(() => {
//           return res.status(200).json(result);
//         })
//         .catch((error) => {
//           console.error('UPDATE TODO: ', error);
//           return res.status(500);
//         });
//     } else {
//       return res.status(404);
//     }
//   },
//   deleteTodo: (req, res) => {
//     const user_id = req.sub;
//     const todo_id = req.params.id;
//     const query = { id: todo_id, user_id: user_id };
//     const { Todo } = req.app.locals.models;

//     Todo.destroy({
//       where: query
//     })
//       .then(() => {
//         return res.status(200).json({ id: todo_id });
//       })
//       .catch((error) => {
//         console.error('DELETE TODO: ', error);
//         return res.status(500);
//       });
//   },
//   getSearchTodo: async (req, res) => {
//     const user_id = req.sub;
//     const query = req.query.q;
//     const { Todo } = req.app.locals.models;

//     await Todo.findAll({
//       where: [
//         {
//           user_id: user_id
//         },
//         Sequelize.literal(`MATCH (text) AGAINST ('*${query}*' IN BOOLEAN MODE)`)
//       ],
//       order: [['date', 'ASC']],
//       attributes: { exclude: ['user_id'] }
//     })
//       .then((result) => {
//         if (result) {
//           return res.status(200).json(result);
//         } else {
//           return res.status(404);
//         }
//       })
//       .catch((error) => {
//         console.error('SEARCH TODO: ', error);
//         return res.status(500);
//       });
//   }
// };

// module.exports = TodoController;
