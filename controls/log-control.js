var connection = require('../config/db.js');
const jwt= require("jsonwebtoken");

module.exports.login  = function (request, response){
    var login_user = {
        email     :request.body.email,
        password  :request.body.password
    }
    console.log(login_user);
    connection.query('SELECT * FROM user WHERE email = "'+login_user.email+'";', function(error, result, rows){
        if(error){
            response.json({
                status  : false,
                message : 'something is wrong:'+error
            })
        }else{
            if(result.length == 0){
                response.json({
                    status  : false,
                    message : 'This email is uncorrect:'+error
                })
            }else{
                var pass = result;
                console.log(pass);
                if (pass == login_user.password) {
                    jwt.sign({user:result}, "secretkey",(err, token) =>{
                        response.status(200).send({
                            status  :true,
                            data    :result, 
                            message :'ok',
                            token,
                        })
                    }) 
                }else{
                    response.json({
                        status  : false,
                        message : 'this password is uncorrect:'+error
                    }) 
                }
            }
        }
    });
}