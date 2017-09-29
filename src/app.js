// URL dónde se encuentra ejecutando nuestro servidor de WS
const wsUri = "ws://localhost:5001"
// Creamos un nuevo "cliente" de WS
let socket = new WebSocket(wsUri)
// Ya que la aplicación de ejemplo es una sala de chat
// al iniciar nos pide un nombre de usuario para utilizarlo
const name = prompt("What is your username?")
document.getElementById('username-label').innerText = `You are: ${name}`

// Controla la conexión al WS
socket.onopen = event => {
  // Descomentar para ver que recibimos por parte del WS
  //console.log(event)
  socket.send(JSON.stringify({
    type: "name",
    data: name
  }))
  console.log("Socket connected successfully...")
}

let messages = document.getElementById("messages")

// Nos suscribimos a los eventos de transferencia de mensajes
// por parte del servidor, si tuvieramos mensajes de diferentes tipos
// podríamos llevar a cabo una validación
socket.onmessage = event => {
  // Descomentar para ver que recibimos por parte del WS
  //console.log(event)
  const data = JSON.parse(event.data)
  messages.innerHTML += `<span class="text-success">${data.name}:</\span> ${data.data}<br /\>`
}

document.querySelector(".btn").onclick = event => {
  const text = document.getElementById("message_text").value
  socket.send(JSON.stringify({
    type: "message",
    data: text
  }))
  messages.innerHTML += `<span class="text-warning">You:</\span> ${text}<br /\>`
}
