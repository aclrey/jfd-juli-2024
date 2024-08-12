const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar'
})

//In the homepage (url: /), run a function with 2 parameters, req and res
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Set/tell Express to use the EJS templating engine 
app.set('view engine', 'ejs')

//Tell which folder will be used to save all .ejs files in
app.set('views', './view-ejs')

//Make access for another page URL
// app.get('/hubungi', (req, res) => {
//     res.send('<h1>Silakan WA: 08112345678</h1>')
// })

app.get('/hubungi', (req, res) => {
    let data = {
        nohp: '081234567',
        email: 'auet@email.com'
    }
    // let nohp = '081234567'
    res.render('hubungi-kami', data)
})

//Akan error, karena Express tidak bisa membaca file dengan extension .html
// app.get('/profil', (req, res) => {
//     res.send(require('./view/profil.html'))
// })

//=============================


//Will look in the determined view-ejs folder
app.get('/profil', (req, res) => {
    let data = {
        jabatan: 'Senior Programmer',
        gender: 'Perempuan',
        gaji: 900000
    }
    // res.render('profil-developer.ejs', {
    //     jbt: jabatan,
    //     gdr: gender
    // })
    res.render('profil-developer.ejs', data)
})

//Proses pengambilan data dari mySql
function get_semuaKaryawan() {
    return new Promise( (resolve, reject) => {
        db.query("SELECT * FROM karyawan", function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

//Gunakan asynx & await untuk memaksa nodejs menunggu script yang dipanggil sampai selesai dieksekusi
app.get('/karyawan', async function(req, res) {
    let dataView = {
        karyawan: await get_semuaKaryawan()
    }
    res.render('karyawan/index', dataView)
})

app.get('/karyawan/detail/:id_karyawan', async function (req, res) {
    //Ambil ID yang dikirim via URL
    //idk utk contain id, diubah jadi idk biar ga bingung
    let idk = req.params.id_karyawan;

    //Lalu dikirim ke proses data mysql
    let dataView = {
        pegawai: await get_satuKaryawan(idk)
    }
    res.render('karyawan/detail', dataView)
})

function get_satuKaryawan(idk) {
    return new Promise( (resolve, reject) => {
        db.query("SELECT * FROM karyawan where ID = ?", [idk], function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

//Turn on the server by listening to the port
app.listen(port, () => {
    //   console.log(`Example app listening on port ${port}`)
    // or can also:
    console.log('Server is ready, open http://localhost:' + port)
})