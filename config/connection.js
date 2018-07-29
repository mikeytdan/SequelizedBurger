var mysql = require("mysql");
var config = require("./config");

var connection = mysql.createConnection({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});

console.log("====================================================");
console.log("Connect to MySQL...");
console.log(`* Host: ${config.mysql.host}`);
console.log(`* Port ${config.mysql.port}`);
console.log(`* User ${config.mysql.user}`);
// console.log(`* Password ${config.mysql.password}`);
console.log(`* Database ${config.mysql.database}`);
console.log("====================================================");
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM burgers", function(err, res) {
    if (err) throw err;
  });
}

module.exports = connection;