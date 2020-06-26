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


/* 一覧表示 */
app.get('/', function(req, res) {
  db.todos.findAll({}).then(function(results) {
    res.render('index.ejs', {todos: results} );
  });
})

/* 新規作成 */
app.post('/create', function(req, res) {
  const params = {
    content: req.body.todoContent
  };
  db.todos.create( params ).then(function(results) {
    res.redirect('/');
  });
})

/* 編集 */
app.get('/edit/:id', function(req, res) {
  db.todos.findByPk(req.paramss.id).then(function(results) {
    res.render('edit.ejs', {todo: results} );
  });
});

/* 更新 */
app.put('/update/:id', function(req, res) {
  const params = {
    content: req.body.todoContent
  };
  const options = {
    where: {
      id: req.paramss.id
    }
  };
  db.todos.update(params, options).then(function(results) {
    res.redirect('/');
  });
});

/* 削除 */
app.delete('/delete/:id', function(req, res) {
  const options = {
    where: {
      id: req.paramss.id
    }
  };
  db.todos.destroy(options).then(function(results) {
    res.redirect('/');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
