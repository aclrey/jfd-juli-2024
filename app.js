const http = require('http')

// Same thing as line 6
// http.createServer((request, respon) => {})

let server = http.createServer( function(request, respon) {
    // Mendeteksi status http 200 (user berhasil terkoneksi dengan aplikasi)
    // Content-type: apa tipe konten yang ingin diberikan ke user
    respon.writeHead(200, {'Content-type': 'text/plain'})
    // Hasil akhir yang akan diberikan ke user
    respon.end('Hello World!')
})

server.listen(3000, function() {
console.log('Server sudah siap, silakan buka di localhost:3000')
})