var formidable = require("formidable");
var fs = require("fs");

exports.saveOrder = function (req, res, callback){
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {        
        console.log(fields);
        fs.writeFile("./data/" + fields.cellNumber + '.txt', JSON.stringify(fields), (err) => {
            if (err) {
                console.log("save to file is failed");
                callback(-1);
                return;
            }
            console.log("order is saved to file");
            callback(0);
            return;
        });
    });

    // how to get the field values
    form.on('field', (name, value) => {
        if(name == "cellNumber"){
            console.log("cell number is: "+ value);
        }
        // get values from Json
        if(name == "dishes"){
            let data = JSON.parse(value)
            console.log("dishes are: "+ data);
        }
    });
    return;
}
