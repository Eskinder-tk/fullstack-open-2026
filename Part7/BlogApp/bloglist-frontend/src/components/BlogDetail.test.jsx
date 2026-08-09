import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogDetail from './BlogDetail'
import { MemoryRouter } from 'react-router-dom'

describe('<BlogDetail />' , () => {
    test('it renders the like and the url property even if the user is not logged in' , async () => {
        const newBlog = {
                    "title": "ISTANBUL",
                    "author": "Ekndnrias",
                    "url": "iiiiiiiiii",
                    "likes": 67,
                    "user": {
                        "username" : "ekndle",
                        "id" : "iueiufh"
                    }
                    }
       

        const mockHandler = vi.fn()

        const { container } = render(<MemoryRouter> <BlogDetail blog={newBlog} toggleDetail={mockHandler}/> </MemoryRouter>)

        const user = userEvent.setup()
        const divU = container.querySelector('.url')
        expect(divU).toBeVisible()

        const divL = container.querySelector('.like')
        expect(divL).toBeVisible()

        const divA = container.querySelector('.author')
        expect(divA).toBeVisible()
    })

    test('Authenticated users who are not the blog creator are shown only the like button' , async () => {
        const newBlog = {
                    "title": "ISTANBUL",
                    "author": "Ekndnrias",
                    "url": "iiiiiiiiii",
                    "likes": 67,
                    "user": {
                        "username" : "ekndle",
                        "id" : "iueiufh"
                    }
                    }
        const newUser = {
            "username" : "otherName",
            "id" : "otherId"
        }
       

        const mockHandler = vi.fn()

        const { container } = render(<MemoryRouter> <BlogDetail blog={newBlog} user={newUser} toggleDetail={mockHandler}/> </MemoryRouter>)

        const user = userEvent.setup()
        const divU = container.querySelector('.deleteButton')
        expect(divU).not.toBeVisible()
    })

    test('Only the blog creator is shown the delete button' , async () => {
        const newBlog = {
                    "title": "ISTANBUL",
                    "author": "Ekndnrias",
                    "url": "iiiiiiiiii",
                    "likes": 67,
                    "user": {
                        "username" : "ekndle",
                        "id" : "iueiufh"
                    }
                    }
        const newUser = {
            "username" : "ekndle",
            "id" : "iueiufh"
        }
       

        const mockHandler = vi.fn()

        const { container } = render(<MemoryRouter> <BlogDetail blog={newBlog} user={newUser} toggleDetail={mockHandler}/> </MemoryRouter>)

        const user = userEvent.setup()
        const divU = container.querySelector('.deleteButton')
        expect(divU).toBeVisible()
    })

    test('it calles the event handler twice if the like button is clicked twice' , async () => {
        const newBlog = {
                    "title": "ISTANBUL",
                    "author": "Ekndnrias",
                    "url": "iiiiiiiiii",
                    "likes": 67,
                    "user": {
                        "username" : "ekndle",
                        "id" : "iueiufh"
                    }
                    }
        const newUser = {
            "username" : "ekndle",
            "id" : "iueiufh"
        }

        const mockHandler = vi.fn()
        
        const { container } = render(<MemoryRouter> <BlogDetail blog={newBlog} updateBlog={mockHandler} user={newUser} toggleDetail={mockHandler}/> </MemoryRouter>)

        const user = userEvent.setup()
        
        const divLB = container.querySelector('.likeButt')
        await user.click(divLB)
        await user.click(divLB)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})


