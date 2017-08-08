const path = require('path')
const http = require('http')
const express = require('express')
const publicPath = path.join(__dirname, '../public')
const socketIO = require('socket.io')

const app = express()
const port = process.env.PORT || 3000

// create http server
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {

  socket.on('createMessage', (message) => {
    console.log('messageCreated', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from client')
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = { app }