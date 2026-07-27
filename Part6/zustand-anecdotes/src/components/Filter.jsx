import { useAnecdoteActions } from '../store'

const Filter = () => {

    const {setFilter } = useAnecdoteActions()

    
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={() => setFilter(event.target.value)} />
        </div>
    )
    }

export default Filter