const express = require('express')
const app = express()
const port = 3000

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

//Include masing" model
const m_karyawan = require('./model/m_karyawan')
const m_departemen = require('./model/m_departemen')
const m_agama = require('./model/m_agama')

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



//Gunakan asynx & await untuk memaksa nodejs menunggu script yang dipanggil sampai selesai dieksekusi
app.get('/karyawan', async function (req, res) {
    //Ambil objek query string
    let dataView = {
        karyawan: await m_karyawan.get_semuaKaryawan,
        message: req.query.msg
    }
    res.render('karyawan/index', dataView)
})

app.get('/karyawan/detail/:id_karyawan', async function (req, res) {
    //Ambil ID yang dikirim via URL
    //idk utk contain id, diubah jadi idk biar ga bingung
    let idk = req.params.id_karyawan;

    //Lalu dikirim ke proses data mysql
    let dataView = {
        pegawai: await m_karyawan.get_satuKaryawan
    }
    res.render('karyawan/detail', dataView)
})


app.get('/karyawan/hapus/:id_karyawan', async function (req, res) {
    //Ambil ID yang dikirim via URL
    try {
        let idk = req.params.id_karyawan;

        //Proses hapus data
        let hapus = await m_karyawan.hapus_satuKaryawan

        //Validation of successful delete
        if (hapus.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }
})


app.get('/karyawan/tambah', async function (req, res) {
    let dataView = {
        dept: await m_departemen.get_semuaDepartemen,
        agm: await m_agama.get_semuaAgama,
    }
    res.render('karyawan/form-tambah', dataView)
})


//To post the data retrieved from frontend
app.post('/karyawan/proses-insert', async function(req,res) {
    let body = req.body

    try {
        let insert = await m_karyawan.insert_karyawan
        if (insert.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }
})


app.get('/karyawan/edit/:id_karyawan', async function (req, res) {
    let idk = req.params.id_karyawan;

    let dataView = {
        pegawai: await m_karyawan.get_satuKaryawan,
        dept: await m_departemen.get_semuaDepartemen,
        agm: await m_agama.get_semuaAgama,
    }
    res.render('karyawan/form-edit', dataView)
})

app.post('/karyawan/proses-update/:id_karyawan', async function (req, res) {
    let idk = req.params.id_karyawan;

    try {
        let update = await m_karyawan.update_karyawan
        if (update.affectedRows > 0) {
            res.redirect(`/karyawan?msg=berhasil edit karyawan a/n ${req.body.form_namaLengkap}`)
        }
    } catch (error) {
        throw error
    }
})


//Turn on the server by listening to the port
app.listen(port, () => {
    //   console.log(`Example app listening on port ${port}`)
    // or can also:
    console.log('Server is ready, open http://localhost:' + port)
})