const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//create schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})
//time stamps property by default adds the time stamp to the model

//create a new model with the defined schema and export
module.exports = mongoose.model('Workout', workoutSchema)

