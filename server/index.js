const WS = require("ws").Server
const port = 5001
const server = new WS({ port })

server.on("connection", ws => {
  ws.on("message", message => {
    console.log(`Received: ${message}`)

    ws.send(`From server: ${message}`)
  })

  ws.on("close", () => {
    console.log("A client was disconnected...")
  })

  console.log("New client connected...")
})
