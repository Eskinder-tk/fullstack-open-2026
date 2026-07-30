import { useQuery , useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes , updateAnecdotes , createAnecdotes } from '../services/requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

export const useAnecdotes = () => {

    const {setMessage} = useContext(NotificationContext)

     const queryClient = useQueryClient()

      const result = useQuery({
          queryKey: ['anecdotes'],
          queryFn: getAnecdotes,
          retry: 1,
          refetchOnWindowFocus: false
      })
    
      const newAnecdoteMutation = useMutation({
        mutationFn : createAnecdotes,
        onSuccess: (newAnecdote) => {
          const anecdotes = queryClient.getQueryData(['anecdotes'])
          queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))},
          onError: (errorMessage) => {
            setMessage(`${errorMessage}`)
            setTimeout(() => {
              setMessage('')
            }, 5000)
          }
      })

      const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdotes,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a ) )}
      })

      return {
        anecdotes : result.data,
        isPending : result.isPending,
        isError : result.isError,
        updateAnecdoteMutation : updateAnecdoteMutation,
        newAnecdoteMutation : newAnecdoteMutation,
      }

}