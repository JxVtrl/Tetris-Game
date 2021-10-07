const express = require('express')
const app = express() // guardando o express em uma constante

const port = 3000
const host = '0.0.0.0'

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => { // rota raiz
    res.sendFile(__dirname + "/src/index.html")
})

app.listen(port, host, () => {
    console.log(`Iniciando o servidor na porta http://localhost:${port}`)
    
})
