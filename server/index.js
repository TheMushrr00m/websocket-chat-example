const WS = require("ws").Server
const port = 5001
const server = new WS({ port })

server.on("connection", ws => {
  console.log("=> Server started...")
  ws.on("message", message => {
    console.log(`Received: ${message}`)

    message = JSON.parse(message)

    if(message.type === "name") {
      // Store the username that send the email
      ws.userName = message.data
      return
    }

    // Send message to all clients
    for(let client of server.clients) {
      if(client !== ws)
        client.send(JSON.stringify({
          type: "message",
          name: ws.userName,
          data: message.data
        }))
    }
    // To send a message to an specific client
    //ws.send(`From server: ${message}`)
  })

  ws.on("close", () => {
    console.log("A client was disconnected...")
  })

  console.log("New client connected...")
})
