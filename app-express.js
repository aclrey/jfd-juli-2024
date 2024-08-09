const express = require('express')
const app = express()
const port = 3000

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

//Turn on the server by listening to the port
app.listen(port, () => {
    //   console.log(`Example app listening on port ${port}`)
    // or can also:
    console.log('Server is ready, open http://localhost:' + port)
})