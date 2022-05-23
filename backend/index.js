const { connect } = require('mongoose');
const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello Moupiya! This moment is yours!')
})

app.listen(port, () => {
    console.log(`myNotebook backend listening at http://localhost:${port}`)
})
