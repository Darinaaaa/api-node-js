var connection = require('../config/db.js');
const jwt= require("jsonwebtoken");

module.exports.deleteItem  = function(request, response){
    let param_id = request.params.id;
    request.token = request.headers['authorization'];
    jwt.verify(request.token, "secretkey", (error, result) =>{
        if(error){
            response.sendStatus(403);
        }else{
            let userForItemsId = result.user[0]['id'];
            connection.query('select * from item where user_id = '+userForItemsId+' and id = '+param_id+';', function(err, res){
                if(err){
                    response.json({
                        status  : false
                    })
                }else{
                    if(res.length !== 0){
                        connection.query('DELETE FROM item WHERE (`id` = '+param_id+');', function(deleteErr, deleteRes){
                            if(deleteErr){
                                response.json({
                                    status  : false
                                })
                            }else{
                                response.status(200).send({
                                    status:true
                                })
                            }
                        })                      
                        }else{
                            response.json({
                                status  : false
                            })
                        }
                    }
                })
            }
        })
    }