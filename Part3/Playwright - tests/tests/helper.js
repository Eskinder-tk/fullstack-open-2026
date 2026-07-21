const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, content) => {
  await page.getByRole('button', { name: 'Create new blog' }).click()
  await page.getByPlaceholder('write title here..').fill(content[0])
  await page.getByPlaceholder('write author name here..').fill(content[1])
  await page.getByPlaceholder('write the url here..').fill(content[2])
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(content[0] + ' ' + content[1]).waitFor()
}

export { loginWith, createNote }