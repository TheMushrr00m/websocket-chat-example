const wsUri = "ws://localhost:5001"
let socket = new WebSocket(wsUri)
const name = prompt("What is your name?")

document.getElementById('username-label').innerText = `You are: ${name}`

socket.onopen = event => {
  socket.send(JSON.stringify({
    type: "name",
    data: name
  }))
  console.log("Socket connected successfully...")
}

let messages = document.getElementById("messages")

socket.onmessage = event => {
  console.log(event)
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
