import React, { useState } from 'react'
import axios from 'axios'

import { useWorkoutContext } from '../hooks/useWorkoutContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const resetState = () => {
    setTitle('')
    setLoad('')
    setReps('')
    setError(null)
    setEmptyFields([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = { title, load, reps }

    try {
      const response = await axios.post('/api/workouts', workout, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      resetState()
      dispatch({
        type: 'CREATE_WORKOUT',
        payload: response.data,
      })
    } catch (error) {
      console.log('--> error', error)
      setError(error.response.data.error)
      setEmptyFields(error.response.data.emptyFields)
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label htmlFor="title">Excersize Title:</label>
      <input
        className={emptyFields.includes('title') ? 'error' : ''}
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label htmlFor="load">Load (in kg):</label>
      <input
        className={emptyFields.includes('load') ? 'error' : ''}
        type="number"
        name="load"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <label htmlFor="reps">Reps:</label>
      <input
        className={emptyFields.includes('reps') ? 'error' : ''}
        type="text"
        name="reps"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm
