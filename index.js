const express = require('express')
const app = express()
const port = 3000
const mongoose=require('mongoose')
app.use(express.json({extended:false}));
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb+srv://admin:admin@cluster0.ewz604a.mongodb.net/E-Commerce-Training')
app.use(require('./routes/register.route'))
app.use(require('./routes/login.route'))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))