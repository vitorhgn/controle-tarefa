const express = require('express');
const app = express();


app.get('/', (req, res)=>{
    res.send('Hello Word!')
})


app.listen(3008,  ()=>{
    console.log("Servidor iniciado!")
})