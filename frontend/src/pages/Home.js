import React, { useEffect } from 'react'
import axios from 'axios'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios('/api/workouts')
        dispatch({
          type: 'SET_WORKOUTS',
          payload: response.data,
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
