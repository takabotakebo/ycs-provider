'use strict'

const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');
const fs = require('fs');
const rimraf = require('rimraf');
const jsonfile = require('jsonfile');
const fetch = require('isomorphic-fetch');
const osc = require('node-osc');
let cnt = 0;

//ファイルの書き込み関数
function writeFile(path, data, cb) {
  fs.writeFile(path, data, function (err) {
    if (err) {
      throw err;
    }
    if(cnt == 0){
      cb();
      cnt ++;
      console.log("writeFile Pass");
    }
  });
}


//getメソッドでアクセスされた際の処理
router.get('/:yabacoin', function(req, res, next) {
  let scalar = req.params.yabacoin;
  let result_record = [];
  let jsondata = {};

  //tochDesignerに渡すデータを書き込む関数
  function textfileWrite(scalar,records, cb) {
    console.log("query Pass");
    console.log("writeFile Try");
    rimraf('./public/data/textsdata', function (err){
      if (err) {
          console.error("ERROR at rmdir");
          console.error(err);
          process.exit(1);
      }
      console.error("Deleted datafolder");
      fs.mkdir('./public/data/textsdata', function (err) {
        if (err) {
            console.error("ERROR at mkdir");
            console.error(err);
            process.exit(1);
        }
        console.error("Created datafolder");

        console.log("YC:" + scalar);
        jsondata.scalar = scalar;
        records.forEach(function(value, index) {
        jsondata["text" + index] = {
              "age" : value.age,
              "gender" : value.gender,
              "yaba_event" : value.yaba_event,
              "likedislike" : value.vector_likedislike,
              "joysad" : value.joysad,
              "angerfear" : value.vector_angerfear,
              "scalar" : value.scalar
            }
          console.log(jsondata);
          console.log("YE:" + value.yaba_event);
          writeFile("./public/data/textsdata/text" + index + ".txt", value.yaba_event, cb);
          jsonfile.writeFile("./public/data/data.json", jsondata, {
              encoding: 'utf-8',
              replacer: null,
              spaces: null
          }, function (err) {
              console.log("Saved jsondata");
          });
        });
      });
    });
  }

  //DBにアクセスして、結果をtextfileWriteに渡した後、ページをレンダリングする
  function accessDB(scalar) {
    console.log("query Try");
    let query = 'SELECT * FROM yaba_articles WHERE scalar = ' + scalar;
    connection.query(query, function(err, records) {
      console.log("見つかった件数" + records.length);
      if(records.length > 0){
        result_record = records;
        textfileWrite(scalar,result_record, function() {
          res.render('detail', {
            title: "YCの一致したYE一覧",
            yaba_articles: records
          });
        });
      } else{
        console.log("検索結果が0のためホームに戻ります");
        res.redirect('/noresult');
      }
    });
  }

  accessDB(scalar);

});

module.exports = router;
