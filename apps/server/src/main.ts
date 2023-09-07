import * as http from 'http'
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'

import { addRosterRoutes } from './roster'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = Number(process.env.PORT || 8080)

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())

addRosterRoutes(app)

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(PORT, HOST, 511, () => {
  console.log(`listening on ${HOST}:${PORT}`)
})
