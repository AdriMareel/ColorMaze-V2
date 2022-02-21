const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use('/', express.static(__dirname + '/front'))

app.listen(3000, () => {
    console.log('Server up at 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/home.html')
})