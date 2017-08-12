const expect = require('expect')
const {isRealString} = require('./validation')

describe('is realString', () => {
  it('should reject non string values', () => {
    const test = isRealString(9)

    expect(test).toBe(false)
  })
  
  it('should reject string with only spaces', () => {
    const test = isRealString('   ')
    expect(test).toBe(false)
  })
  
  it('should allow string with non-space characters', () => {
    const test = isRealString(' tony  ')
    expect(test).toBe(true)
    
  })
})