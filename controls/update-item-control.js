var connection = require('../config/db.js');
const jwt= require("jsonwebtoken");

module.exports.updateItem  = function(request, response){
    let param_id = request.params.id;
    request.token = request.headers['authorization'];
    var changes = {
        title  :request.body.title,
        price  :request.body.price
    }
    jwt.verify(request.token, "secretkey", (error, result) =>{
        if(error){
            response.sendStatus(403);
        }else{
            let userForItemsId = result.user[0]['id'];
            connection.query('select * from item where user_id = '+userForItemsId+' and id = '+param_id+';', function(err, res){
                if(err){
                    response.json({
                        status  : false,
                        message : 'You can`t update this item:'+err
                    })
                }else{
                    if(res.length !== 0){
                        connection.query('UPDATE `item` SET `title` = "'+changes.title+'", `price` = "'+changes.price+'" WHERE (`id` = '+param_id+');', function(updateErr, updateRes){
                            if(updateErr){
                                response.json({
                                    status  : false,
                                    message : 'You can`t update this item:'+err
                                })
                            }else{
                                connection.query('select * from item inner join user on user_id = user.id where item.id = '+param_id+' and user.id = '+userForItemsId+' ;', function(updatedItemErr, updatedItemRes){
                                    if(updatedItemErr){
                                        response.json({
                                            status  : false,
                                            message : 'You can`t update this item:'+err
                                        })
                                    }else{
                                        response.status(200).send({
                                            status  : true,
                                            data    :updatedItemRes
                                        })
                                    }
                                })
                            }
                        })                      
                    }else{
                        response.json({
                            status  : 404,
                            message : 'This item does not exists'
                        })
                    }
                }
            })
        }
    })
}