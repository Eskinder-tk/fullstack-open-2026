import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import userService from '../services/users'

export const useUsers = () => {

    const result = useQuery({
        queryKey: ['users'],
        queryFn: userService.getUsers,
        refetchOnWindowFocus : false
    })

    return {
        users : result.data ?? []
    }
}