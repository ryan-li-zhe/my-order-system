var express = require("express");
var app = express();
// import { mainctl } from './controllers/mainctl.js';
var mainctl = require("./controllers/mainctl");

// set view engine to use ejs. It will look for the "views" folder
app.set("view engine", "ejs");
// if user type in "localhost:3000/", it will look for mainctl.showIndex function
app.get("/", mainctl.showIndex);

app.get("/orders", mainctl.showAllOrders);

app.get("/orders/:cellNumber", mainctl.showAnOrder);

app.post("/ordersToDB", mainctl.saveAnOrderToDB);

app.post("/ordersToFile", mainctl.saveAnOrderToFile);

app.use(express.static("public"));

app.listen(3000);

console.log("server has already started...\nPlease go to localhost:3000");