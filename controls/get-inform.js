var connection = require('../config/db.js');
const jwt= require("jsonwebtoken");

module.exports.me  = function(request, response) {
    request.token = request.headers['authorization'];
    jwt.verify(request.token, "secretkey", (error, result) =>{
        if(error){
            response.sendStatus(403);
        }else{
            response.status(200).send({
                data : result.user
            })
        }
    })
}