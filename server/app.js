//attach the environment variables
require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./Routes/workouts');
const cors = require('cors')
//express app
const app = express();

//middlewares - piece of code that is invoked after every request

app.use(express.json())//used to get access to the request
app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
})
app.use(cors())
//react to the requests: Router
app.use('/api/workouts', workoutRoutes);

//database connection
const port = process.env.PORT||3000; 
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        //listen for requests
        app.listen(port, () =>{
        console.log(`Listening on port: ${port}`);
        })
    })
    .catch((e) =>{
        console.log(e)
    })