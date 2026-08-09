import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

export const useBlogs = () => {
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey : ['blogs'],
        queryFn : blogService.getAll,
        refetchOnWindowFocus : false
    })

    const newCommentMutation = useMutation({
      mutationFn: blogService.addComment
      
    })

    const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
        const blogs = queryClient.getQueryData(['blogs'])
        queryClient.setQueryData(['blogs'], blogs.map(b => b.id === updatedBlog.id ? {...b , likes : updatedBlog.likes} : b))
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (blogId) => {
        const blogs = queryClient.getQueryData(['blogs'])
        queryClient.setQueryData(['blogs'], blogs.filter(b => b.id !== blogId))
    }
  })


    return {

        blogs: result.data ?? [], 
        isLoading: result.isLoading,
        isError: result.isError,
        error: result.error,
        addBlog : (content) => newBlogMutation.mutate(content),
        handleLikes : (id ,blogObject) => updateBlogMutation.mutate(id ,blogObject),
        deleteBlogMutate : (blogId) => deleteBlogMutation.mutate(blogId),
        addComment: (id , comment) => newCommentMutation.mutate({id, comment})
    }
}