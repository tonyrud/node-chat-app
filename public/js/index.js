let socket = io()

socket.on('connect', function() {
  console.log('Connected to server')
})

socket.on('disconnect', function() {
  console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a')

  var li = jQuery(`<li></li>`)
  li.text(`${message.from} ${formattedTime}: ${message.text}`)

  $('#messages').append(li)
})

socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  var li = jQuery(`<li></li>`)
  var a = jQuery(`<a target="_blank">My current location</a>`)
  li.text(`${message.from} ${formattedTime}: `)
  a.attr('href', message.url)
  li.append(a)
  $('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault()

  const messageTextbox = jQuery('[name=message]')
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageTextbox.val()
    },
    function() {
      messageTextbox.val('')
    }
  )
})

var locationButton = jQuery('#send-location')

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by you browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr('disabled').text('Send location')
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
    },
    function() {
      locationButton.removeAttr('disabled').text('Send location')
      alert('Unable to fetch location')
    }
  )
})
