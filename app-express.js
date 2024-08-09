const express = require('express')
const app = express()
const port = 3000

//In the homepage (url: /), run a function with 2 parameters, req and res
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Make access for another page URL
app.get('/hubungi', (req, res) => {
    res.send('<h1>Silakan WA: 08112345678</h1>')
  })

//Turn on the server by listening to the port
app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
  // or can also:
  console.log('Server is ready, open http://localhost:' + port)
})