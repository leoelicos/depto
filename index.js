import * as dotenv from 'dotenv'
import db from './config/connection.js'
import express from 'express'
import cors from 'cors'

import routes from './routes/index.js'
dotenv.config()

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})
app.use(routes)
const PORT = process.env.port || 3001

app.listen(PORT, () => {
  console.log(`API server  running on port ${PORT}!`)
})
