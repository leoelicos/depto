import mysql from 'mysql2'
import * as dotenv from 'dotenv'
dotenv.config()

const online = process.env.JAWSDB_URL

const offline = {
  port: 3306,
  // host: 'localhost',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}
console.log({ online, offline })
const db = mysql.createConnection(online || offline)

export default db
