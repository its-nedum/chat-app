//Make connection
const socket = io.connect('http://localhost:4000')

//Query Dom
let message = document.getElementById('message')
let handle = document.getElementById('handle')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let feedback = document.getElementById('feedback')

//Emit Events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

//
message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})

//Listen for event
socket.on('chat-sent', (data) => {
    feedback.innerHTML = ""
    output.innerHTML += '<p><strong>'+ data.handle + ':</strong>' + data.message +'</p>'
})

socket.on('who-is-typing', (data) => {
    feedback.innerHTML = '<p><em>'+ data+ ' is typing a message...</em></p>'
})