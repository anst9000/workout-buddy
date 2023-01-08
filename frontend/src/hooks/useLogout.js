import { useAuthContext } from './useAuthContext'
import { useWorkoutContext } from './useWorkoutContext'

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext()
  const { dispatch: workoutDispatch } = useWorkoutContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch a logout action
    authDispatch({ type: 'LOGOUT' })
    workoutDispatch({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }
}
