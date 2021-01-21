var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
const jwt= require("jsonwebtoken");
var fileUpload = require('express-fileupload');
var path = require('path');
var multer = require('multer');
var app = express();

var regController = require('./controls/reg-control'); 
var loginController = require('./controls/log-control');
var pageInformation = require('./controls/get-inform');
var getAllItems = require('./controls/get-all-items');
var getItemById = require('./controls/item-by-id');
var updateController = require('./controls/update-item-control');
var deleteController = require('./controls/delete-control');
var createController = require('./controls/create-control');
var uploadImgController = require('./controls/upload-control');

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(fileUpload());

app.post("/api/register", regController.register); //регистрация
app.post("/api/login", loginController.login); // авторизация
app.get("/api/me", pageInformation.me); // информация о текущем пользователе
app.get("/api/items", getAllItems.items); // получить список всех товаров пользователя
app.get("/api/items/:id", getItemById.idItem); //получиь описание товара по его id
app.put("/api/items/:id", updateController.updateItem); // изменить данные о товаре
app.delete("/api/items/:id", deleteController.deleteItem); // удалить товар
app.post("/api/items", createController.createItem); // создать элемент
app.post("/api/upload/:id", uploadImgController.index); //заглузить изображение для указаного id

app.listen(3000, function(){
    console.log('page is ready for work');
});
    