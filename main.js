require('dotenv').config()
const express = require('express')
const List_Router = require('./Routes/List_Router.js')
const user_Router = require('./Routes/user_Router.js')
const mongoose = require('mongoose')
const global_ErrorHandler = require('./controllers_actions/global_errorHandler.js')
const cookieParser = require('cookie-parser')
const refresh_Router = require('./Routes/refresh_Router.js')
const logout_Router = require('./Routes/logout_Router.js')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
const url = 'mongodb://localhost:27017/toDoList';

mongoose.connect(url)
        .then(()=>{
            console.log(`mongodb connect successfuly`)
        })
        .catch(err =>{
            console.log(err)
        })

app.use(cors()); // error in frontend
app.use(express.json());    //body-parser
app.use(cookieParser())

app.use('/api/list',List_Router)
app.use('/api/user',user_Router)
app.use('/api/refresh',refresh_Router)
app.use('/api/logout',logout_Router)

app.use('*',(req,res) => {
    res.status(404).json({success: false,status:"fail",message:"this resource is not available",data:null})
})

app.use(global_ErrorHandler)

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})