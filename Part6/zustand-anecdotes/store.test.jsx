import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, render } from '@testing-library/react'

vi.mock('./src/services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  }
}))

import anecdoteService from './src/services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useFilter, useAnecdoteActions } from './src/store'
import anecdotes from './src/services/anecdotes'
import AnecdoteList from './src/components/AnecdoteList'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdote from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Keep Going', votes : 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    

    await act(async () => {
      await result.current.initialize()
})

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('sends the anecdotes sorted by votes', async () => {
    useAnecdoteStore.setState({ anecdotes: [{ id: 1, content: 'third note', votes : 3  },
                                            { id: 2, content: 'first note', votes: 67 } , 
                                            { id: 3, content: 'second note', votes : 9} ] })
    
    
    const {container} = render(<AnecdoteList />)
    

    const div = container.querySelectorAll('.anecdote')

    expect(div.length === 3)

    expect(div[0].textContent).toContain('first note')
    expect(div[1].textContent).toContain('second note')
    expect(div[2].textContent).toContain('third note')
    
  })

  it('the search filter state sends the correct filtered anecdotes', async () => {
    useAnecdoteStore.setState({ anecdotes: [{ id: 1, content: 'third note', votes : 3  },
                                            { id: 2, content: 'first note', votes: 67 } , 
                                            { id: 3, content: 'second note', votes : 9} ] , filter : 'third' })
    
    
    const {container} = render(<AnecdoteList />)
    

    const div = container.querySelectorAll('.anecdote')
    expect(div.length === 1)

    expect(div[0].textContent).toContain('third note')
  
  })

  it('voting increases the number of votes on an anecdote', async () => {
  useAnecdoteStore.setState({ anecdotes: [{ id: 1, content: 'test anecdote', votes: 0 }] })
  
  anecdoteService.update.mockImplementation(async (id ,updatedAnecdote) => updatedAnecdote)

  const { result } = renderHook(() => useAnecdoteActions())

  await act(async () => {
    await result.current.voteInc(1)
  })

  const { result: anecdotesResult } = renderHook(() => useAnecdotes())
  expect(anecdotesResult.current[0].votes).toBe(1)

  expect(anecdoteService.update).toHaveBeenCalledWith(1 ,{
    id: 1,
    content: 'test anecdote',
    votes: 1
  })
})

})