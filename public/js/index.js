let socket = io()

socket.on('connect', function() {
  console.log('Connected to server')

  socket.emit('createMessage', {
    to: 'dude@example.com',
    text: 'Supppp'
  })
})

socket.on('disconnect', function() {
  console.log('Disconnected from server')
})

socket.on('newMessage', function (msg) {
  console.log('New Message', msg)
})
