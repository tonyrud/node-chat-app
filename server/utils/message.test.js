const expect = require('expect')
const { generateMessage, generateLocationMessage } = require('./message')

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const lat = 1
    const long = 2
    const from = 'Me'
    let url = `https://www.google.com/maps/?q=1,2`
    const message = generateLocationMessage(from, lat, long)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({
      from,
      url
    })
  })
})