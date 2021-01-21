var connection = require('../config/db.js');

module.exports.items  = function(request, response){
    connection.query('SELECT * FROM item;', function(error, result){
        if(error){
            response.json({
                status  : false,
                message : 'something goes wrong'+error
            })
        }else{
            response.json({
            status  :true,
            data    :result
            })
        }
    })
}