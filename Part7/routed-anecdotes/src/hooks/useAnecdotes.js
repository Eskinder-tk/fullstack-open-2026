import { useState , useEffect } from "react";
import anecdoteService from "../services/anecdotes"

const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])

    const addAnecdote = (anecdote) => {
        return anecdoteService.createNew(anecdote).then(data => setAnecdotes(anecdotes.concat(data)))
    }

    const deleteAnecdote = (id) => {
        anecdoteService.remove(id).then(() => setAnecdotes(anecdotes.filter(a => a.id !== id)))
    }

    return {
        anecdotes,
        addAnecdote,
        deleteAnecdote
    }
}


export default useAnecdotes