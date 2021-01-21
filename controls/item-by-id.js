var connection = require('../config/db.js');

module.exports.idItem  = function(request, response){
    let param_id = request.params.id;
    connection.query('SELECT * FROM item where id = "'+param_id+'";', function(error, result){
        if(error){
            response.json({
                status  : false,
                message : 'something is wrong:'+error
            })
        }else{
            if(result.length !== 0){
                response.json({
                    status  :true,
                    data    :result
                })
            }else{
                response.json({
                    status  :404,
                    message : 'this item does not exist'
                })
            }
            
        }
    })
}