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
db.connect()

//In the homepage (url: /), run a function with 2 parameters, req and res
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//To retrieve data encoded/encrypted in the HTML form that is sent through the HTTP protocol
//Wdym encypted? The HTTP protocol encrypts (protects) your data
//Encryption is done to make sure the data reaches the designated backend, uninterrupted by external ppl
app.use(express.urlencoded({extended:false}))

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
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM karyawan", function (errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

//Gunakan asynx & await untuk memaksa nodejs menunggu script yang dipanggil sampai selesai dieksekusi
app.get('/karyawan', async function (req, res) {
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
    let sql =
        `SELECT
karyawan.*,
departemen.kode AS kodeDept,
departemen.nama AS namaDept,
agama.nama as namaAgama
FROM karyawan
LEFT JOIN departemen ON departemen.id = karyawan.departemen_id
LEFT JOIN agama ON agama.id = karyawan.agama_id
where karyawan.id = ?`;

    return new Promise((resolve, reject) => {
        db.query(sql, [idk], function (errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

function hapus_satuKaryawan(idk) {
    let sql =
        `DELETE FROM karyawan
where karyawan.id = ?`;

    return new Promise((resolve, reject) => {
        db.query(sql, [idk], function (errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

app.get('/karyawan/hapus/:id_karyawan', async function (req, res) {
    //Ambil ID yang dikirim via URL
    try {
        let idk = req.params.id_karyawan;

        //Proses hapus data
        let hapus = await hapus_satuKaryawan(idk)

        //Validation of successful delete
        if (hapus.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }
})

app.get('/karyawan/tambah', function (req, res) {
    res.render('karyawan/form-tambah')
})

//To post the data retrieved from frontend
app.post('/karyawan/proses-insert', async function(req,res) {
    let body = req.body

    try {
        let insert = await insert_karyawan(req)
        if (insert.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    }
    catch (error) {
        throw error
    }
})

//WORKS BUT NOT IDEAL
// function insert_karyawan(body) {
//     let sql =
//         `INSERT INTO karyawan
//         (nama, gender, alamat, nip)
//         VALUES
//         ('${body.form_namaLengkap}', '${body.form_gender}', '${body.form_alamat}', '${body.form_nip}')`

//         return new Promise((resolve, reject) => {
//         db.query(sql, [], function (errorSql, hasil) {
//             if (errorSql) {
//                 reject(errorSql)
//             } else {
//                 resolve(hasil)
//             }
//         })
//     })
// }

//Safer way
function insert_karyawan(req) {
    let data = {
        nama    : req.body.form_namaLengkap,
        gender  : req.body.form_gender,
        alamat  : req.body.form_alamat,
        nip     : req.body.form_nip,
    }

    let sql = `INSERT INTO karyawan SET ?`

        return new Promise((resolve, reject) => {
        db.query(sql, [data], function (errorSql, hasil) {
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