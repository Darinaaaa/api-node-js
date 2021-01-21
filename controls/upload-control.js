var connection = require('../config/db.js');
const jwt= require("jsonwebtoken");
var multer = require('multer');

var storage = multer.diskStorage({
    destination: '../public/images',
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
var upload = multer({ storage: storage, fileFilter: fileFilter }).single('image');

module.exports.index  = function(request, response){
    let param_id = request.params.id;
    request.token = request.headers['authorization'];
    jwt.verify(request.token, "secretkey", (error, result) =>{
        if(error){
            response.sendStatus(403);
        }else{
            if(request.method == "POST"){
                console.log(request.body.image);
                var uploadedFile = request.files.image;
                console.log(uploadedFile);
                var file = request.files.image;
                var imageName = file.name;
                if(!request.files){
                    response.status(400).send("choose the file to apload");
                }else{
                    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ){
                        connection.query('UPDATE `item` SET `image` = "'+imageName+'" where id = "'+param_id+'"', function (res, err) {
                            if(err){
                                err
                            }else{
                                res.status(200).send('ok');
                                upload(file)
                            }
                        })
                    }else{
                        response.send('unexpected format');
                    }
                }
            }else{
                response.render('index');
            }
        }
    })
} 