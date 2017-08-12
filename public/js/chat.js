let socket = io()

function scrollToBottom() {
  const messages = jQuery('#messages')
  const newMessage = messages.children('li:last-child')
  const clientHeight = messages.prop('clientHeight')
  const scrollTop = messages.prop('scrollTop')
  const scrollHeight = messages.prop('scrollHeight')

  const newMessageHeight = newMessage.innerHeight()
  const lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}


socket.on('connect', function() {
  const params = jQuery.deparam(window.location.search)

  socket.emit('join', params, function (err) { 
    if (err) {
      alert(err)
      window.location.href = '/'
    } else {
      console.log('No error')
    }
   })
})

socket.on('disconnect', function() {
  console.log('Disconnected from server')
})

socket.on('updateUserList', function (users) { 
  console.log('users list: ', users)
  const ol = jQuery('<ol></ol>')

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user))
  })

  jQuery('#users').html(ol)
 })

socket.on('newMessage', function(message) {
  const template = jQuery('#message-template').html()
  const formattedTime = moment(message.createdAt).format('h:mm a')
  
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })

  jQuery('#messages').append(html)
  scrollToBottom()
})

socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a')

  const template = jQuery('#location-message-template').html()
  
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  })

  jQuery('#messages').append(html)
  scrollToBottom()
  
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
