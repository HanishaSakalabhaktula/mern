import React from 'react'
import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const workout = {
            title, 
            reps, 
            load
        }

        const response = await fetch('http://localhost:8080/api/workouts/',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )

        const json = await  response.json();

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
            console.log("Could not fetch")
        }else{
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log("new workout added", json)
            dispatch({type: 'CREATE_WORLOUT', payload: json})
        }
    }
  return (
    <div>
      <form className='flex flex-col justify-center items-start' onSubmit={handleSubmit}>
        <h2 className='text-lg font-bold'>Add a New Workout</h2>

        <label className='font-semibold' htmlFor="title">Exercise Title: </label>
        <input className={emptyFields.includes('titles') ? 'focus:border-red-300 focus:outline-none rounded focus-visible:ring' : 'rounded p-1 focus-visible:ring focus:border-blue-400 focus-within:shadow-lg focus:outline-none'} id='title' type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>

        <label className='font-semibold' htmlFor="reps">Repititions: </label>
        <input className={emptyFields.includes('reps') ? 'focus:border-red-300 focus:outline-none rounded focus-visible:ring' : 'rounded p-1 focus-visible:ring focus:border-blue-400 focus-within:shadow-lg focus:outline-none'} id='reps' type="number" onChange={(e) => setReps(e.target.value)} value={reps}/>

        <label className='font-semibold' htmlFor="load">Load in kg: </label>
        <input className={emptyFields.includes('load') ? 'focus:border-red-300 focus:outline-none rounded focus-visible:ring' : 'rounded p-1 focus-visible:ring focus:border-blue-400 focus-within:shadow-lg focus:outline-none'} id='load' type="number" onChange={(e) => setLoad(e.target.value)} value={load}/>


        <button className='rounded p-2 bg-[#46C2CB] mt-2'>Add Workout</button>

        {error && <div className='mt-2 text-[#E94560] rounded border border-[#E94560] p-2'>{error}</div>}
      </form>
    </div>
  )
}

export default WorkoutForm
