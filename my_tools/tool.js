// To validate the callback return value. 
exports.validateReturn = function(data, dataSrouce){
    if(data == -1){
        console.log("save to " + dataSrouce + " failed");
        return;
    }
    else if(data == 0){
        console.log("save to " + dataSrouce + " successful");
        return;
    }
    else{
        console.log("Warning: callback return value doesn't match anything! Something is wrong!!!");
        return;
    }
}