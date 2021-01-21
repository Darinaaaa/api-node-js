var connection = require('../config/db.js');
const jwt= require("jsonwebtoken");

module.exports.createItem  = function(request, response){
    request.token = request.headers['authorization'];
    var new_item = {
        title  :request.body.title,
        price  :request.body.price
    }
    jwt.verify(request.token, "secretkey", (error, result) =>{
        if(error){
            response.sendStatus(403);
        }else{
            let userForItemsId = result.user[0]['id'];
                connection.query('INSERT INTO item (`created_at`, `title`, `price`, `user_id`) VALUES (now(), "'+new_item.title+'", "'+new_item.price+'",  '+userForItemsId+');', function(insertErr, insertRes){
                    if(insertErr){
                        response.json({
                            status : false
                        })
                    }else{
                        connection.query('select * from item inner join user on user_id = user.id where item.title = "'+new_item.title+'" and user.id = '+userForItemsId+' and item.price = "'+new_item.price+'" ;', function(error, res){
                            if(error){
                                response.json({
                                    status  : false
                                })
                            }else{
                                response.status(200).send({
                                    status  : true,
                                    date    : res
                                })
                        }
                        })
                    }
                })
        }
    })
}