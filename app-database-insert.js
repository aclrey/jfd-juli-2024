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

let sql =
`INSERT INTO
karyawan (nama, gender, alamat, nip)
VALUES ('Jokowi', 'L', 'Solo', '007')`
//Insert data ke mysql (using SQL queries)
db.query(sql, function(error, hasil){
    if (error) {
        console.log(error);
    } else {
        // console.log(hasil)
        if (hasil.affectedRows > 0) {
            console.log('Berhasil insert data karyawan')
        }
    }
})

db.end()