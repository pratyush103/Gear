const express = require('express') 
const cors = require('cors') //cross origin request

const authRoutes = require('./routes/auth.js')

const app = express()
const PORT = process.env.PORT || 5000;

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

//Handles requests and responses
app.get('/', (req, res) => {
    res.send('Hello World!')


})

app.use('/auth', authRoutes) //authRoutes is a function that returns a router object

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))