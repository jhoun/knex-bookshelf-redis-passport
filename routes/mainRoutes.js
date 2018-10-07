const express = require('express');
const router = express.Router();
const Tasks = require('../db/models/Tasks.js');
const Users = require('../db/models/Users.js');

router.get('/', (req, res) => {
  Users.fetchAll()
    .then(result => {
      result = result.serialize();

      res.render('home.hbs', { result });
    })
    .catch(err => {
      console.log('err', err);
    });
});

router.get('/:user_id/tasks', (req, res) => {
  const { user_id } = req.params;
  Tasks.where({ user_id })
    .fetchAll()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log('err', err);
    });
});

router.post('/', (req, res) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    is_complete: req.body.is_complete,
    user_id: req.body.user_id
  };

  Tasks.forge(payload)
    .save()
    .then(result => {
      res.send('success');
    })
    .catch(err => {
      console.log('err', err);
      res.send(err);
    });
});

router.put('/:task_id', (req, res) => {
  const { title, description, is_complete } = req.body;
  const { task_id } = req.params;
  Tasks.where({ task_id })
    .fetch()
    .then(task => {
      return task.save({ title, description, is_complete });
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log('err', err);
      res.send(err);
    });
});

router.delete('/:task_id/delete', (req, res) => {
  const { task_id } = req.params;
  Tasks.where({ task_id })
    .destroy()
    .then(result => {
      res.send('destroyed');
    })
    .catch(err => {
      console.log('err', err);
    });
});

module.exports = router;
