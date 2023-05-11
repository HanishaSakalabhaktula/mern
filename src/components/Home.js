import React, { useEffect } from 'react'
import WorkoutComponent from './WorkoutComponent';
import WorkoutForm from './WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
const Home = () => {

  
    const { workout, dispatch } = useWorkoutsContext();
    //home will display all the workouts
    useEffect(() =>{
        //this will run only once and fetch all the workouts from the database
        const fetchWorkouts = async () =>{
            const response = await fetch('http://localhost:8080/api/workouts/');
            const json = await response.json();

            if(response.ok){
                dispatch({type: 'SET_WORKOUT', payload: json})
            }else{
              console.log("Could not fetch")
            }
        }

        fetchWorkouts();
    }, [])
  return (
    <div className='p-2 bg-gray-200 h-full grid grid-cols-12 gap-4'>
      <div className='col-span-8'>
        {
            workout && workout.map((w) => {
                return(
                    <WorkoutComponent key={w.id} workout = {w}/>
                )
            })
        }
      </div>
      <div className='col-span-4'>
        <WorkoutForm />
      </div>
    </div>
  )
}

export default Home
