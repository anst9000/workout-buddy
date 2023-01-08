import React from 'react'
import axios from 'axios'
import { FaTrashAlt } from 'react-icons/fa'
import { formatDistanceToNow } from 'date-fns'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) return

    try {
      const response = await axios.delete(`/api/workouts/${workout._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })

      dispatch({
        type: 'DELETE_WORKOUT',
        payload: response.data,
      })
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>
        <FaTrashAlt />
      </span>
    </div>
  )
}

export default WorkoutDetails
