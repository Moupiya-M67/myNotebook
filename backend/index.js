const { connect } = require('mongoose');
const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express()
const port = 3000

app.use(express.json())

// app.get('/',(req,res)=>{
//     res.send("Hello")
// })
//Available routes  [Endpoints]
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`myNotebook backend listening at http://localhost:${port}`)
})
