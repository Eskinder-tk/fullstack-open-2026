import { useMatch, Link } from "react-router-dom"
import { useUsers } from "../hooks/useUsers"

const UserDetail = () => {

    const {users} = useUsers()

    const match = useMatch('/users/:id')

    const usr = match ? users.find((u) => u.id === match.params.id) : null

    if (!usr) {
        return <div>wait a sec..</div>
    }

    

    return (
        <div>
            <div>
                <h1>{usr.name}</h1>
            </div>
            <h3>Added blogs</h3>

            
                <ul>
                    {usr.blogs.map((b)=> (
                       <Link key={b.id} to={`/blogs/${b.id}`}> <li >{b.title}</li></Link>
                    ))}     
                </ul>
            

            
                
            
        </div>
        
    )
}
export default UserDetail