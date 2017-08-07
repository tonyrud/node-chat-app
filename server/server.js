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
  console.log('new user connected')

  socket.on('disconnect', () => {
    console.log('Disconnected from client')
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = { app }