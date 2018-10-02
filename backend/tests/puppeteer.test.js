const { testUserCredentials } = require('./data/blogs')

describe('blog app', () => {
  describe('when not logged in', () => {
    beforeEach(() => {
      if (page.cookies.length > 0) {
        page.deleteCookie(page.cookies)
      }
    })
    it('renders login page', async () => {
      await page.goto('http://localhost:3003')
      const textContent = await page.$eval('body', el => el.textContent)

      expect(textContent.includes('Log in to blog application')).toBe(true)
    })

    it('notifies of faulty login attempt', async () => {
      await page.goto('http://localhost:3003')

      // Fill out login form
      await page.type('input[name=username]', 'nonexisting')
      await page.type('input[name=password]', 'whatevs')
      await page.click('input[type=submit]')

      // Wait for the page to load
      await page.waitForSelector('.notification')
      const textContent = await page.$eval('.notification', el => el.textContent)
      expect(textContent.includes('invalid')).toBe(true)
    })

    it('allows user to log in', async () => {
      await page.goto('http://localhost:3003')

      // Fill out login form
      await page.type('input[name=username]', testUserCredentials.username)
      await page.type('input[name=password]', testUserCredentials.password)
      await page.click('input[type=submit]')

      // Wait for the page to load
      await page.waitForSelector('.bloglist')
      const textContent = await page.$eval('body', el => el.textContent)
      expect(textContent.includes('blogs')).toBe(true)
    })
  })

  describe('when user is logged in', () => {
    it('renders the blog list', async () => {
      await page.goto('http://localhost:3003')
      await page.waitForSelector('.bloglist')
      const textContent = await page.$eval('body', el => el.textContent)
      expect(textContent.includes('blogs')).toBe(true)
    })

    it('can add a new blog', async () => {
      await page.goto('http://localhost:3003')
      await page.waitForSelector('.bloglist')
      await page.click('.add-blog-button button')
      await page.type('input[name=title]', 'Puppeteer test blog')
      await page.type('input[name=author]', 'Puppetmaster')
      await page.type('input[name=url]', 'https://pptr.dev')
      await page.click('input[type=submit]')
      const textContent = await page.$eval('body', el => el.textContent)
      expect(textContent.includes('Puppeteer test blog')).toBe(true)
    })
  })
})
