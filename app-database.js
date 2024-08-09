const http = require('http') //Modul bawaan dari node.js
const mysql = require('mysql2') //Modul dari node_modules yang sudah diinstall

//Konfigurasi database mysql yang ingin digunakan
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jfd_belajar"
})

//Menyambungkan atau membuka koneksi
db.connect()

//Ambil data dari mysql (using SQL queries)
db.query("SELECT * FROM karyawan", function(error, hasil){
    if (error) {
        console.log(error);
    } else {
        console.log(hasil)
        console.log("========")
        console.log(hasil[1].nama)
        console.log("========")
        for (let i = 0; i < hasil.length; i++) {
            console.log(hasil[i].nama)
            
        }

    }
})

db.end()