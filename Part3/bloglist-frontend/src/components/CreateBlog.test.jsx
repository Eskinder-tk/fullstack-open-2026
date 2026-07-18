import { render, screen } from '@testing-library/react'
import CreatBlog from './CreatBlog'
import userEvent from '@testing-library/user-event'

test('The Blog form works as it should', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreatBlog createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('write title here..')
  const author = screen.getByPlaceholderText('write author name here..')
  const url = screen.getByPlaceholderText('write the url here..')
  const sendButton = screen.getByText('create')

  await user.type(title, 'There is nothing impossible')
  await user.type(author, 'Alexander')
  await user.type(url, 'AAAAAAAAAAAAAAAA')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('There is nothing impossible')
})