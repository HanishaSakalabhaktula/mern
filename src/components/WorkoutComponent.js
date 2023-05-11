import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutComponent = ({workout}) => {
  const {dispatch} = useWorkoutsContext();
  const handleClick = async () => {
    const response = await fetch('http://localhost:8080/api/workouts/' + workout._id, {
      method: 'DELETE'

    });

    const json = await response.json();

    if(response.ok){
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
  return (
    <div className='w-3/4 p-4 m-2 bg-white shadow-lg shadow-black-500/50 rounded flex justify-between'>
      <div>
      <h4 className='text-[#46C2CB] font-bold'>{workout.title}</h4>
      <p><span className='font-bold'>Load : </span>{workout.load}</p>
      <p><span className='font-bold'>Repetition: </span>{workout.reps}</p>
      <p className='text-sm text-gray-400 mb-2'>{workout.createdAt}</p>
      </div>
      <div>
      <span onClick={handleClick} className='text-sm text-white bg-[#46C2CB] rounded-full py-1 px-2 font-semibold cursor-pointer'>delete</span>
      </div>
    </div>
  )
}

export default WorkoutComponent
