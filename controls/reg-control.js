var connection = require('../config/db.js');
const jwt= require("jsonwebtoken");

module.exports.register  = function (request, response){
    var new_user = {
        name      :request.body.name,
        telnum    :request.body.telnum,
        email     :request.body.email,
        password  :request.body.password
    }
    console.log(new_user.name);
    connection.query('select id from user where email = "'+request.body.email+'";', function(error, res, field){
        if(error){
            response.json({
                status  : false,
                field   :'email',
                message : 'Somethig is wrong:'+error
            })
        }else{
            if(res.length != 0){
                response.json({
                    status  : false,
                    field   :'email',
                    message : 'This email is alresdy registered:'+error
                })
            }else{
                connection.query('select id from user where telnum = "'+request.body.telnum+'";', function(error, res, field){
                    if(error){
                        response.json({
                            status  : false,
                            field   :'TelNum',
                            message : 'Something is wrong:'+error
                        })
                    }else{
                        if(res.length != 0){
                            response.json({
                                status  : false,
                                field   :'TelNum',
                                message : 'This phone number is alresdy registered:'+error
                            })
                        }else{
                            connection.query('INSERT INTO `user` (`name`, `telnum`, `email`, `password`) VALUES ("'+new_user.name+'", "'+new_user.telnum+'", "'+new_user.email+'", "'+new_user.password+'");', function(error, result, field){
                                if(error){
                                    response.status(422).json({
                                        status  : false,
                                        field   :'current_password',
                                        message : 'wrong password:'+error
                                    })
                                }else{
                                    connection.query('select * from user where email = "'+new_user.email+'" and password = "'+new_user.password+'";', function(error, result){
                                        if(error){
                                            response.json({
                                                status  : false,
                                                field   :'TelNum',
                                                message : 'Something is wrong:'+error
                                            })
                                        }else{
                                            jwt.sign({user:result}, "secretkey",(err, token) =>{
                                                response.status(200).send({
                                                    status  :true,
                                                    data    :result, 
                                                    message :'ok',
                                                    token
                                                })
                                            })
                                        }
                                    })                
                                }
                            });
                        }
                    }
                })
            }
        }
    });   
}