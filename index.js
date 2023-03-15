import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

import db from './config/connection.js'
import routes from './routes/index.js'

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
