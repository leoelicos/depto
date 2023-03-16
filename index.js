import express from 'express'
import cors from 'cors'
import db from './config/connection.js'

import routes from './routes/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})
app.use(routes)
const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`API server  running on port ${PORT}!`)
})
