var http = require("http");
var app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
var server = http.createServer(app);

server.listen(process.env["API_PORT"], () => {
  console.log("App is listening on port no. 4000");
});
