var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





/* ここから書き始める */

// メソッドオーバーライドの設定
var methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
// sequelizeで定義したデータベースの読み込み
const db = require('./models/index');

app.get('/', function(req, res) {
  res.redirect('/todos');
});


/* 一覧表示 */
app.get('/todos', function(req, res) {
  const options = {
    include: [{
      model: db.todo
    }],
    order: [[
      db.todo,
      'updated_at',
      'DESC'
    ]]
  };
  db.category.findAll(options).then(function(results) {
    res.render('todos/index.ejs', { categories: results });
  });
})

/* 新規作成 */
app.post('/todos', function(req, res) {
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
app.get('/todos/:id/edit', function(req, res) {
  db.todo.findByPk(req.params.id).then(function(results) {
    res.render('todos/edit.ejs', { todo: results });
  });
});

/* 更新 */
app.put('/todos/:id', function(req, res) {
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
app.delete('/todos/:id', function(req, res) {
  const options = {
    where: {
      id: req.params.id
    }
  };
  db.todo.destroy(options).then(function(results) {
    res.redirect('/');
  });
});

app.get('/categories', function(req, res) {
  const options = {
    include: [{
      model: db.todo
    }]
  };
  db.category.findAll(options).then(function(results) {
    console.log(results);
    res.render('categories/index.ejs', { categories: results });
  });
});

app.post('/categories', function(req, res) {
  const params = {
    name: req.body.categoryName
  };
  db.category.create(params).then(function(results) {
    res.redirect('/categories');
  });
});

app.get('/categories/:id/edit', function(req, res) {
  db.category.findByPk(req.params.id).then(function(results) {
    res.render('categories/edit.ejs', { category: results });
  });
});

app.put('/categories/:id', function(req, res) {
  const params = {
    name: req.body.categoryName
  };
  const filter = {
    where: {
      id: req.params.id
    }
  }
  db.category.update(params, filter).then(function(results) {
    res.redirect('/categories')
  });
})

app.delete('/categories/:id', function(req, res) {
  const filter = {
    where: {
      id: req.params.id
    }
  };
  db.category.destroy(filter).then(function(results) {
    res.redirect('/categories');
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
