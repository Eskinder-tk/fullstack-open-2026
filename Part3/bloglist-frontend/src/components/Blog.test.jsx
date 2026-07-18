import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />' , () => {


    test('it renders the title and the author but not the likes and url' , async () => {
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
        const user = {
            "username" : "ekndle",
            "id" : "iueiufh"
        }


        const { container } = render(<Blog blog={newBlog} user={user} />)

        const div = container.querySelector('.titleAuthor')
        expect(div).toHaveTextContent(
            'ISTANBUL' || 'Ekndnrias'
        )
        expect(div).toBeVisible()
        const divL = container.querySelector('.like')
        expect(divL).not.toBeVisible()

        const divA = container.querySelector('.author')
        expect(divA).not.toBeVisible()

        

    })

    test('it renders the like and the url property if the view button is clicked' , async () => {
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

        const { container } = render(<Blog blog={newBlog} user={newUser} toggleDetail={mockHandler}/>)

        const user = userEvent.setup()
        const button = container.querySelector('.butt')
        await user.click(button)

        const divL = container.querySelector('.like')
        expect(divL).toBeVisible()

        const divA = container.querySelector('.author')
        expect(divA).toBeVisible()
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
        
        const { container } = render(<Blog blog={newBlog} user={newUser}   updateBlog={mockHandler}/>)

        const user = userEvent.setup()
        
        const divLB = container.querySelector('.likeButt')
        await user.click(divLB)
        await user.click(divLB)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})