const expect = require('expect')
const {Users} = require('./users')

describe('Users', () => {
  
  let users
  
  beforeEach(() => {
    users = new Users()
    users.users = [
      {
        id: '1234',
        name: 'Tony',
        room: 'Awesome Room'
      },
      {
        id: '567',
        name: 'Beth',
        room: 'React Room'
      },
      {
        id: '394',
        name: 'Jay',
        room: 'Awesome Room'
      },
    ]
    
    
  })

  it('should add new user', () => {
    var users = new Users()
    var user = {
      id: '1234',
      name: 'Tony',
      room: 'Awesome Room'
    }
    const resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user])
    
  })

  it('should remove a user', () => {
    const id = '1234'
    const user = users.removeUser(id)
    expect(user.id).toBe(id)
    expect(users.users.length).toBe(2)
  })
  
  it('should not remove a user', () => {
    const id = '99'
    const user = users.removeUser(id)
    expect(user).toNotExist()
    expect(users.users.length).toBe(3)
    
  })

  it('should find user', () => {
    const id = '1234'
    const user = users.getUser(id)
    expect(user.id).toBe(id)
  })
  
  it('should not find user', () => {
    const id = '12344'
    const user = users.getUser(id)
    expect(user).toNotExist()
    
  })

  it('should return names for node course', () => {
    const userList = users.getUserList('Awesome Room')

    expect(userList).toEqual(['Tony', 'Jay'])
  })

  it('should return names for node course', () => {
    const userList = users.getUserList('React Room')

    expect(userList).toEqual(['Beth'])
  })

})