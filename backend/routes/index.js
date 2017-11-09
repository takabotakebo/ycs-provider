var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM yaba_articles';
  connection.query(query, function(err, records) {
    res.render('index', {
      title: 'Yaba Coin System ServerSide',
      yaba_articles: records
    });
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var gender = req.body.gender;
  var age = req.body.age;
  var yaba_event = req.body.yaba_event;
  var vector_likedislike = req.body.vector_likedislike;
  var vector_joysad = req.body.vector_joysad;
  var vector_angerfear = req.body.vector_angerfear;
  var scalar = req.body.scalar;
  var created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO yaba_articles (gender, age, yaba_event, vector_likedislike, vector_joysad, vector_angerfear, scalar, created_at) VALUES ("' + gender + '", "' + age + '","' + yaba_event +'","' + vector_likedislike + '","' + vector_joysad + '","' + vector_angerfear + '","' + scalar + '","' + created_at + '")';
  console.log(query);
  connection.query(query, function(err, rows) {
    res.redirect('/');
  });
});

module.exports = router;
