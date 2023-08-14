const express = require('express')
const app = express()
const port = 3000
const mongoose=require('mongoose')
require('dotenv').config();
app.use(express.json({extended:false}));
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.use(require('./routes/register.route'))
app.use(require('./routes/login.route'))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))