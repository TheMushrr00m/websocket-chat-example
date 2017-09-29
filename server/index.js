// Referenciamos las librerías a utilizar

// Para manejar los WebSockets utilizaremos la librería 'ws'
// que nos facilita bastante el trabajo con estos.
const WS = require("ws").Server
// Puerto a donde escuchará nuestro servidor WS
const port = 5001
// Creamos nuestro servidor de WS
const server = new WS({ port })

// Nos suscribimos al evento de conexión
// el cual es llamado cuando un cliente se conecta
server.on("connection", ws => {
  // El método callback es llamado cuando
  // se conecta un nuevo cliente y en el argumento "ws"
  // vamos a tener un "enlace" a este cliente

  // Podemos enviar un mensaje al cliente
  // de bienvenida apenas se conecte
  // los parámetros son el nombre del mensaje y un json con los datos
  //ws.send('welcome', { greeting: 'Welcome WS client!' })

  // Los WebSockets se comunican en base a mensajes
  // por lo que debemos suscribirnos a cada uno de los
  // posibles mensajes que los clientes puedan enviar
  ws.on("message", message => {
    console.log(`Received: ${message}`)
    message = JSON.parse(message)
    // Ya que el cliente puede enviar mensajes de diferentes tipos
    // Validamos que el mensaje recibido sea del tipo "name"
    if(message.type === "name") {
      // Store the username that send the email
      ws.userName = message.data
      return
    }

    for(let client of server.clients) {
      // Cómo está será una aplicación de chat
      // enviamos el mensaje a todos los clientes
      // evitando enviarlo a "nosotros"
      if(client !== ws)
        client.send(JSON.stringify({
          type: "message",
          name: ws.userName,
          data: message.data
        }))
    }
  })

  // Nos suscribirnos también al evento
  // que se ejcuta cuando un cliente decide terminar la conexión
  ws.on("close", event => {
    console.log("A client was disconnected...")
    // Podríamos emitir un mensaje a los demás clientes
    // indicando la desconexión de uno.
  })

  // Todos los llamados a console.log son del servidor
  // con própositos de depuración
  console.log("New client connected...")
})
