const http = require('http')

let server = http.createServer( function(request, respon) {
    let nama = "Audrey E"
    let alamat = "Tangerang Selatan"
    let html = `<h2>Hai, nama saya ${nama}, saya tinggal di ${alamat}<h2>`
    respon.writeHead(200, {'Content-type': 'text/plain'})
    respon.end(html)
})

server.listen(3000, function() {
    console.log('Server sudah siap, silakan buka di localhost:3000')
    })