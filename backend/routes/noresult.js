'use strict'

const express = require('express');
const router = express.Router();

//getメソッドでアクセスされた際の処理
router.get('/', function(req, res, next) {
  res.render('noresult', {
  });
});

module.exports = router;
