const express = require('express')
const app = express()

const cors = require('cors');

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);

const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors()); 
app.use(express.static('public'));

app.post('/todo', async (req, res) => {
    const title = req.body.title
    const [id]= await knex('tasks').insert({ title });
    res.status(201).send()
})

app.patch('/todo/:id/checked', async (req, res) => {
    const id = parseInt(req.params.id) //converte para um inteiro
    
    const task = await knex('tasks')
            .select('completed')
            .where({ id });

    const newStatus = !task.completed

    await knex('tasks')
        .where({ id })
        .update({ completed: newStatus});

    res.status(201).send()
})

app.delete('/todo/:id/delete', async (req, res) => {
    const id = parseInt(req.params.id) //converte para um inteiro
    
    const task = await knex('tasks')
            .where({ id })
            .del();

    res.status(204).send()
})

app.get('/todo', async (req, res) => {
    const tasks = await knex('tasks').select('*').orderBy('id', 'desc');
    res.json(tasks)
})

app.get('/todo/statistic', async (req, res) => {
        const completedResult = await knex('tasks')
            .where('completed', true)
            .count('* as count')
            .first();

        const pendingResult = await knex('tasks')
            .where('completed', false) 
            .count('* as count')
            .first();

        const completedCount = completedResult.count;
        const pendingCount = pendingResult.count;
        
        res.json({
            "completed": completedCount,
            "pending": pendingCount
        });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
