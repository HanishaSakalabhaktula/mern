import { createContext, useReducer } from "react";//provides global state for the components

export const WorkoutsContext = createContext();//new context
//provide the context to the application
//wrap the application with it
export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WORKOUT':
            return {
                workout: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workout: [action.payload, ...state.workout]
            }
        case 'DELETE_WORKOUT':
            return {
                workout: state.workout.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}
export const WorkoutsContextProvider = ({children}) =>{
    //similar to usestate
    const [state, dispatch] = useReducer(workoutsReducer, {
        workout: null
    })

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>   
    )
}
