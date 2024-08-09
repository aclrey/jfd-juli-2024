const http = require('http')
const fs = require('fs')
const mysql = require(mysql2)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jfd_belajar"
})

let server = http.createServer(function (request, respon) {
    if (request.url == "/") {
        fs.createReadStream("./view/beranda.html").pipe(respon)
    } else if (request.url == "/karyawan") {
        // fs.createReadStream("./view/karyawan/semua.html").pipe(respon)
        respon.writeHead(200, { 'Content-type': 'text/html' })
        db.query("SELECT * FROM karyawan", function (error, hasil) {
            if (error) {
                console.log(error);
            } else {
                //Buat variabel kosong
                let dataKaryawan = ""
                //Mengisi variabel dengan looping DB
                for (let i = 0; i < hasil.length; i++) {
                    //Isi variabel kosong dengan loopingan data dari db
                    dataKaryawan += hasil[i].nama + ' - ' + hasil[i].gender + '<br>';
                }

                //Mengirim ke frontend menggunakan respon manual
                //...karena fs.createReadStream tidak mampu
                //...menerima kiriman data dari backend
                respon.write(
                    `<h1>Array berisi data karyawan:</h1><br>
                    ${dataKaryawan}
                    <pre>
                    ${JSON.stringify(hasil, null, 4)}
                    <pre>`
                )
            }
        })
    } else if (request.url == "/profil") {
        fs.createReadStream("./view/profil.html").pipe(respon)
    } else if (request.url == "/berita") {
        fs.createReadStream("./view/berita.html").pipe(respon)
    } else {
        fs.createReadStream("./view/error404.html").pipe(respon)
    }
})


server.listen(3000, function () {
    console.log('Server sudah siap, silakan buka di localhost:3000')
})