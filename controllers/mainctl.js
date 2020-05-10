var files = require("../models/files.js");
var db = require("../models/db.js");
var tool = require("../my_tools/tool");


// export function showIndex(req, res){
exports.showIndex = function(req, res){
    // it will look for index.ejs file
    res.render("index");
};


exports.saveAnOrderToDB = function(req, res){
    console.log("send order to db");
    db.saveToDB(req, res, function(data){
        tool.validateReturn(data, "DB");
        return;
    });
};

exports.saveAnOrderToFile = function(req, res){
    console.log("send order to file");
    // "returnData" is the callback return value
    files.saveOrder(req, res, function(returnData){
        tool.validateReturn(returnData, "file");
        return;   
    });
};

exports.showAllOrders = function(req, res){
    db.getAllOrders(function(data){
        // console.log(data);
        res.render("showAllOrders", {
            "orders" : data
        });      
    });
}

exports.showAnOrder = function(req, res){
    console.log("geting an order");
    var cellNumber = req.params.cellNumber;
    db.getAnOrder(cellNumber, function(data){
        console.log(data);
        res.render("showAnOrder", {
            "cellNumber" : data.cellNumber,
            "delivery" : data.delivery,
            "dishes" : JSON.parse(data.dishes)
        });        
    });
}