import { useUsers } from "../hooks/useUsers";
import "../index.css"
import { useCredentials } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Users = () => {

    const {user} = useCredentials()

    const {users} = useUsers()
    
    const sortedUsers = users.sort((a,b) => b.blogs.length - a.blogs.length)

    const loggedUser = "🔹" 

    const logged = (userName) => {
        if (user?.username === userName) {
            return loggedUser
        }
        else {
            return null
        }
    }

    return (
        <div>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>Users</h2>
        <div className="styled-table">
            
            <table className="modern-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Blogs created</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => (
                <tr key={u.id}>
                    <td><Link to={`/users/${u.id}`}> {u.name} </Link></td>
                    <td>{u.username}{logged(u.username)}</td>
                    <td>{u.blogs.length}</td>
                </tr>
                ))}
                
            </tbody>
            </table>
        </div>
        </div>
        
    )
}
export default Users