var moment = require('moment');
var connection = require('../mysqlConnection');
const osc = require('node-osc');
var commonconfig = require('../../commonconfig.js');

var provider_ip = commonconfig.providerIp;

//OSCで受診したコインの枚数に応じて処理を実行
var oscServer = new osc.Server(4000,provider_ip);
console.log("OSC RECEIVER");

oscServer.on("message", function (msg, rinfo) {
  msg.shift() ;
  msg = utf8_bytes_to_string(msg);
  console.log("Receive YabaCoin's Num :");

  var obj = (new Function("return " + msg))();
  console.log(obj.value);
  var gender = obj.value.gender;
  var age = obj.value.age;
  var yaba_event = obj.value.YE;
  var vector_likedislike = obj.value.likedislike;
  var vector_joysad = obj.value.joysad;
  var vector_angerfear = obj.value.angerfear;
  var scalar = obj.value.scalar;
  var created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO yaba_articles (gender, age, yaba_event, vector_likedislike, vector_joysad, vector_angerfear, scalar, created_at) VALUES ("' + gender + '", "' + age + '","' + yaba_event +'","' + vector_likedislike + '","' + vector_joysad + '","' + vector_angerfear + '","' + scalar + '","' + created_at + '")';
  console.log(query);
  connection.query(query, function(err, rows) {});

});

// UTF8のバイト配列を文字列に変換
function	utf8_bytes_to_string(arr){
    if (arr == null)
        return null;
    var result = "";
    var i;
    while (i = arr.shift()) {
        if (i <= 0x7f) {
            result += String.fromCharCode(i);
        } else if (i <= 0xdf) {
            var c = ((i&0x1f)<<6);
            c += arr.shift()&0x3f;
            result += String.fromCharCode(c);
        } else if (i <= 0xe0) {
            var c = ((arr.shift()&0x1f)<<6)|0x0800;
            c += arr.shift()&0x3f;
            result += String.fromCharCode(c);
        } else {
            var c = ((i&0x0f)<<12);
            c += (arr.shift()&0x3f)<<6;
            c += arr.shift() & 0x3f;
            result += String.fromCharCode(c);
        }
    }
    return result;
}
