import express from 'express'
import * as http from 'http'
import { Server } from 'socket.io'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = Number(process.env.PORT || 8080)

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(PORT, HOST, 511, () => {
  console.log(`listening on ${HOST}:${PORT}`)
})
