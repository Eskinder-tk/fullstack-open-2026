import { create } from 'zustand'

import anecdoteService from './services/anecdotes'
import anecdotes from './services/anecdotes'


const useAnecdoteStore = create((set , get) => ({
  anecdotes: [],
  filter : '',
  actions: {
    voteInc: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(id ,
        {...anecdote , votes : anecdote.votes + 1}
      )
       set(
      state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
      }))
    },
    deleteAnecdote : async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const deleted = await anecdoteService.remove(id)
      set(
        state => ({
          anecdotes: state.anecdotes.filter(a => a.id !== id)
        })
      )
    }
    ,
    add : async (anecdote) => {
      console.log(anecdote)
      const newAnecdote = await anecdoteService.createNew(anecdote)
      set(state => ({anecdotes : state.anecdotes.concat(newAnecdote)}))
    },
    setFilter : value => set(() => ({filter : value})),
    initialize : async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter === '') return anecdotes
  if (filter !== '') return anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
  return anecdotes
}


export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)