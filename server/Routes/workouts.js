const express = require('express')
const workouts = require('../models/workout')

//get all controls
const {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControls')


const router = express.Router();//instance of router
//get all workouts
router.get('/', getAllWorkouts)

//get a single workout
router.get('/:id', getSingleWorkout)

//post a new workout
router.post('/', createWorkout)

//delete a single workout
router.delete('/:id', deleteWorkout)

//update a workout
router.patch('/:id', updateWorkout)

module.exports = router;