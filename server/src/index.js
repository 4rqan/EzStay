var http = require("http");
var app = require("./app");
var server = http.createServer(app);
const dotenv = require("dotenv");
dotenv.config();

server.listen(process.env["API_PORT"], () => {
  console.log("App is listening on port no. 4000");
});
