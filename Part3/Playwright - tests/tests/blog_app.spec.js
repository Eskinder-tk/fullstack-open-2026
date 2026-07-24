const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Esnkdr',
        username: 'ekndle',
        password: 'salainen'
      }
    })
    

    await page.goto('/')
  })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByRole('link', { name: 'login' }).click();
            await loginWith(page, 'mluukkai', 'salainen')

            const noticeDiv = page.locator('.notice')
            await expect(noticeDiv).toContainText('successfully logged in')
            
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('link', { name: 'login' }).click();
            await loginWith(page, 'mluukkai', 'wrong')

            const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('wrong credentials')

            await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
        })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('link', { name: 'login' }).click();
      await loginWith(page, 'ekndle', 'salainen')
      
    })

    test('a new blog can be created', async ({ page }) => {
    
        const noticeDiv = page.locator('.notice')
            await expect(noticeDiv).toContainText('successfully logged in')
       
        await page.getByRole('link', { name: 'new blog' }).click();
        await createNote(page, ['Be Great' , 'Alexander tha Great' , 'beeeeeeeeeGreeeeeeeeeeeaaaaaaaaaatt'])
        await expect(page.getByRole('link', { name: 'Be Great by Alexander tha' })).toBeVisible()
        
    })
    test('a blog can be liked', async ({ page }) => {
        const noticeDiv = page.locator('.notice')
            await expect(noticeDiv).toContainText('successfully logged in')
            
        await page.getByRole('link', { name: 'new blog' }).click();
        await createNote(page, ['Be Great' , 'Alexander tha Great' , 'beeeeeeeeeGreeeeeeeeeeeaaaaaaaaaatt'])
        await page.getByRole('link', { name: 'Be Great by Alexander tha' }).click()
        await page.getByRole('button', {name : 'like'}).click()

        await expect(page.getByText('1')).toBeVisible()
    })

    test('A logged-in user and the creator can delete a blog', async ({ page }) => {

      const noticeDiv = page.locator('.notice')
            await expect(noticeDiv).toContainText('successfully logged in')
            
            
      await page.getByRole('link', { name: 'new blog' }).click()
      await createNote(page, ['Be Great', 'Alexander tha Great', 'beeeeeeeeeGreeeeeeeeeeeaaaaaaaaaatt'])
  
  
      await page.getByRole('link', { name: 'Be Great by Alexander tha' }).click()

  
      const deleteButton = page.getByRole('button', { name: 'Delete' })
      await expect(deleteButton).toBeVisible()

  
      page.once('dialog', async dialog => {
        await dialog.accept()
      })

  
      await deleteButton.click()
      await expect(page.getByRole('link', { name: 'Be Great by Alexander tha' })).not.toBeVisible()
})

   test('A user that is not the creator of the blog cannot see the delete button', async ({ page }) => {

    const noticeDiv = page.locator('.notice')
            await expect(noticeDiv).toContainText('successfully logged in')
           

      await page.getByRole('link', { name: 'new blog' }).click()    

      await createNote(page, ['Be Great', 'Alexander tha Great', 'beeeeeeeeeGreeeeeeeeeeeaaaaaaaaaatt'])
            
      await page.getByRole('button', { name: 'log out' }).click();

      await page.getByRole('link', { name: 'login' }).click()
      await loginWith(page, 'mluukkai', 'salainen')
      
  
      await page.getByRole('link', { name: 'Be Great by Alexander tha' }).click()

  
      await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
})

    /*test('a blog delete button is only visible to the creator of the blog', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await createNote(page, ['Be Great' , 'Alexander tha Great' , 'beeeeeeeeeGreeeeeeeeeeeaaaaaaaaaatt'])
        await page.getByText('Be Great Alexander tha Great').getByText('view').click()

        await expect(page.getByText('Be Great Alexander tha GreathidebeeeeeeeeeGreeeeeeeeeeeaaaaaaaaaatt0').getByText('delete')).toBeVisible()
    })

    test('the blogs are ordered corresponding to their likes', async ({ page }) => {

    await loginWith(page, 'mluukkai', 'salainen')

    await createNote(page, ['most liked blog' , 'test' , 'beeeeeeeeeGreeeeeeeeeeeaaaaaaaaaatt'])
    await createNote(page, ['little liked blog' , 'test123' , 'tesssssssssssssssssst'])
    await createNote(page, ['one liked blog' , 'test123' , 'tesssssssssssssssssst'])

    const mostLikedBlog = page.locator('.titleAuthor').filter({ hasText: 'most liked blog' })
    const littleLikedBlog = page.locator('.titleAuthor').filter({ hasText: 'little liked blog' })
    const oneLikedBlog = page.locator('.titleAuthor').filter({ hasText: 'one liked blog' })

    await mostLikedBlog.getByRole('button', { name: 'view' }).click()
    await littleLikedBlog.getByRole('button', { name: 'view' }).click()
    await oneLikedBlog.getByRole('button', { name: 'view' }).click()

    for (let i = 0 ; i < 15 ; i++) {
        await mostLikedBlog.getByRole('button', { name: 'like' }).click()
        await page.waitForResponse(res => res.status() === 200)
    }

    for (let i = 0 ; i < 5 ; i++) {
        await littleLikedBlog.getByRole('button', { name: 'like' }).click()
        await page.waitForResponse(res => res.status() === 200)
    }

    await oneLikedBlog.getByRole('button' , {name : 'like'} ).click()
    await page.waitForResponse(res => res.status() === 200)

    const blogs = page.locator('.titleAuthor')

    await expect(blogs.nth(0)).toContainText('most liked blog')
    await expect(blogs.nth(1)).toContainText('little liked blog')
    await expect(blogs.nth(2)).toContainText('one liked blog')
})
    */
  })
})