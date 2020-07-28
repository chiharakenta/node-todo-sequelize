const express = require('express');
const router = express.Router();
const db = require('../models/index');

// Todo一覧表示
router.get('/', function(req, res) {
  const options = {
    include: [{
      model: db.todo
    }]
  };
  db.category.findAll(options).then(function(results) {
    res.render('todos/index.ejs', { categories: results });
  });
})

/* 新規作成 */
router.post('/', function(req, res) {
  const params = {
    category_id: req.body.categoryId,
    content: req.body.todoContent
  };
  db.todo.create(params)
    .then(function(results) {
      res.redirect('/');
    })
    .catch(function(error) {
      console.error(error.errors[0].message);
    })
})

/* 編集 */
router.get('/:id/edit', function(req, res) {
  db.todo.findByPk(req.params.id).then(function(results) {
    res.render('todos/edit.ejs', { todo: results });
  });
});

/* 更新 */
router.put('/:id', function(req, res) {
  const params = {
    content: req.body.todoContent
  };
  const options = {
    where: {
      id: req.params.id
    }
  };
  db.todo.update(params, options).then(function(results) {
    res.redirect('/');
  });
});

/* 削除 */
router.delete('/:id', function(req, res) {
  const options = {
    where: {
      id: req.params.id
    }
  };
  db.todo.destroy(options).then(function(results) {
    res.redirect('/');
  });
});

module.exports = router;