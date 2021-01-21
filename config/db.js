// //подключение бд
let mysql = require('mysql');
//настройка модуля
let con = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '123456',
    database    : 'like_olx'
});
con.connect(error => {
    if(error) {
        console.log(error);
        throw error;
    }
    console.log("DB is successfully connected");
});
module.exports = con;
