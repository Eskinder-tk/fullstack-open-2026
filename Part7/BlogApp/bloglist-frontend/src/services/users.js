import axios from "axios";
const baseUrl = '/api/users'

const getUsers = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

export default {getUsers}