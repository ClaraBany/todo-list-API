const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const todos = []

app.post('/todo', (req, res) => {
    todos.push({
        "id": todos.length + 1,
        "title": req.body.title, 
        "checked": false
    })
    console.log(todos)
    res.send()
})

app.patch('/todo/:id/checked', (req, res) => {
    const id = parseInt(req.params.id) //converte para um inteiro
    const indice = todos.findIndex(objeto => objeto.id === id)

     if (indice === -1) {
        // Se o item não existe, retorne um erro 404 para o cliente
        return res.status(404).json({ error: "Tarefa não encontrada. Verifique o id enviado." });
    }

    todos[indice].checked = true
    res.status(201).send()
})

app.get('/todo', (req, res) => {
    res.json(todos)
})

app.get('/todo/statistic', (req, res) => {
    const completed = todos.filter(objeto => objeto.checked === true)
    const pending = todos.filter(objeto => objeto.checked === false)

    res.json({
        "completed": completed.length,
        "pending": pending.length
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
