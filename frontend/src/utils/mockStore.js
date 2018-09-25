jest.mock('../services/blogs')
import blogService from '../services/blogs'

export const mockUser = {
  username: 'foo',
  name: 'Foo',
  id: '123456',
  token: 'fake token',
}

export const mockState = {
  blogs: {
    blogs: blogService.blogs,
  },
  notifications: {
    notifications: [],
  },
  users: {
    currentUser: null,
    users: [],
  }
}

export const mockLoggedInState = {
  ...mockState,
  users: {
    currentUser: mockUser,
    users: [],
  }
}
