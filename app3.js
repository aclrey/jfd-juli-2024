const http = require('http')

let server = http.createServer( function(request, respon) {
    if (request.url == "/") {
        respon.writeHead(200, {'Content-type': 'text/html'})
        respon.write('<h1>Halaman Beranda</h1>')
    } else if (request.url == "/profil") {
        respon.writeHead(200, {'Content-type': 'text/html'})
        respon.write('<h1>Halaman Profil</h1>')
    } else {
        respon.writeHead(200, {'Content-type': 'text/html'})
        respon.write('<h1>404 Not Found</h1>')
    }
    respon.writeHead(200, {'Content-type': 'text/plain'})
    respon.end(html)
})

server.listen(3000, function() {
    console.log('Server sudah siap, silakan buka di localhost:3000')
    })