//this file contains set of functions
const workouts = require('../models/workout')
const mongoose = require('mongoose')
//get all workouts
const getAllWorkouts = async (req, res) =>{
    const allWorkouts = await workouts.find({}).sort({createdAt:-1})//sorting them in latest first

    res.status(200).json(allWorkouts);
}

//get a single workout
const getSingleWorkout = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such workout"})
    }
    const singleWorkout = await workouts.findById(id);

    if(!singleWorkout){
        return res.status(400).json({error: "No workout found"});
    }
    res.status(200).json(singleWorkout);
}

//create a new workout
const createWorkout = async (req, res) =>{
    //get the info
    const {title, reps, load} = req.body;
    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: "All fields are mandatory", emptyFields})
    }
    //add to database
    try{
        const workout = await workouts.create({title, reps, load})
        console.log(workout.title)
        res.status(200).json(workout)
    }catch(e){
        res.status(400).json({error: e.message})
    }
}


//delete a workout
const deleteWorkout = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such workout"})
    }

    const workout = await workouts.findOneAndDelete({_id: id});

    if(!workout){
        return res.status(404).json({error: "no such workout"})
    }



    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such workout"})
    }

    const workout = await workouts.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!workout){
        res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout);
}

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}