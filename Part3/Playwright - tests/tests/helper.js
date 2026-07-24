const loginWith = async (page, username, password)  => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, content) => {
  await page.getByLabel('Title').fill(content[0])
   await page.getByLabel('Author').fill(content[1])
   await page.getByLabel('URL').fill(content[2])
  await page.getByRole('button', { name: 'create' }).click()
  //await page.getByText(content[0] + ' ' + content[1]).waitFor()
}

export { loginWith, createNote }