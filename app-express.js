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
const c_karyawan = require('./controller/c_karyawan')

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
app.get('/karyawan', c_karyawan.index)
app.get('/karyawan/detail/:id_karyawan', c_karyawan.detail)
app.get('/karyawan/hapus/:id_karyawan', c_karyawan.hapus)
app.get('/karyawan/tambah', c_karyawan.tambah)
//To post the data retrieved from frontend
app.post('/karyawan/proses-insert', c_karyawan.proses_insert)
app.get('/karyawan/edit/:id_karyawan', c_karyawan.edit)
app.post('/karyawan/proses-update/:id_karyawan', c_karyawan.proses_update)

//Turn on the server by listening to the port
app.listen(port, () => {
    //   console.log(`Example app listening on port ${port}`)
    // or can also:
    console.log('Server is ready, open http://localhost:' + port)
})