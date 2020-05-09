var mongoose = require("mongoose");
var formidable = require("formidable");

// get connection
mongoose.connect('mongodb://localhost:27017/my-order-system', {useNewUrlParser: true, useUnifiedTopology: true});
// create an order schema
var orderSchema = new mongoose.Schema({
    cellNumber : Number,
      delivery : String,
      dishes   : [String]
});

orderSchema.statics.findAllOrders = function(callback){
    this.find({}, function(err, resluts){
        if(err){
            console.log("Didn't find any orders");
            return;
        }
        callback(resluts);
        return;
    });
}

orderSchema.statics.findAnOrder = function(cellNumber, callback){
    this.find({ 
        cellNumber : cellNumber
    }, function(err, resluts){
        if(err){
            console.log("Didn't find any orders");
            return;
        }
        callback(resluts[0]);
        return;
    });
}
// compile Order model. Only can be compiled onece during one connection.
var Order = mongoose.model('Order', orderSchema);

/** 
    mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    // we're connected!
    console.log("connect to MongoDB succsessful!");
    });
*/

exports.saveToDB = function(req, res, callback){
    // get user input from form
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {        
        // console.log(fields);
        var cellNumber = fields.cellNumber;
        var delivery = fields.delivery;
        var dishes = fields.dishes;

        // create an instance
        var zheLi = new Order({
            cellNumber : cellNumber,
            delivery : delivery,
            dishes   : JSON.stringify(dishes)
        });
        // persist
        zheLi.save(function(err){
            if(err){
                console.log(err);
                callback(-1);
                return;
            }
            callback(0);
            return;
        });
    });    
}  

exports.getAllOrders = function(callback){
    return Order.findAllOrders(callback);    
}

exports.getAnOrder = function(cellNumber, callback){
    return Order.findAnOrder(cellNumber, callback);    
}