const express = require('express')
const open = require('open');
const path = require('path')
const ip = require('ip')
const multer = require('multer')

const PORT = 3000
const URL = `http://localhost:${PORT}`

const app = express()

const inMemoryStorage = {}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'))
})

app.post('/upload', multer().single('file'), (req, res) => {
    const { file } = req
    inMemoryStorage['file'] = file.buffer.toString()
    res.json({ ok: true })
})

app.get('/preview', (req, res) => {
    res.send(inMemoryStorage['file'])
})

app.get('/api/server-info', (req, res) => {
    res.json({
        ip: ip.address(),
        port: PORT
    })
})

app.listen(3000, () => {
    open(URL)
    console.log(URL)
})
