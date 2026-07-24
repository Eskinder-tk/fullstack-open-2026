import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { MemoryRouter } from 'react-router-dom'


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


        const { container } = render(<MemoryRouter><Blog blog={newBlog} user={user} /></MemoryRouter>)

        const div = container.querySelector('.titleAuthor')
        expect(div).toHaveTextContent(
            'ISTANBUL' 
        )
        expect(div).toBeVisible()
        const divL = container.querySelector('.like')
        expect(divL).not.toBeVisible()

        const divA = container.querySelector('.author')
        expect(divA).not.toBeVisible()

        

    })

    
})