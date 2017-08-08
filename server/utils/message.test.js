const expect = require('expect')
const {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message', () => {
    const from = 'Me'
    const text = 'Some text'
    const testMsg = generateMessage(from, text)

    expect(testMsg.createdAt).toBeA('number')
    expect(testMsg).toInclude({
      from,
      text
    })

  })
})