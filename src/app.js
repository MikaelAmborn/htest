import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import axios from 'axios'
import cors from 'cors'

const app = express()
const hiveApp = express()
const port = 3000
const hivePort = 3030

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

hiveApp.use(logger('dev'))
hiveApp.use(express.json())
hiveApp.use(cookieParser())
hiveApp.use(express.static('public'))

app.get('/selfTest', (req, res) => {
  console.log("Cookies", req.cookies)
  console.log(`Request origin ${req.get('origin')}`)

  res.send({someJson: 'data' })
})

app.get('/', (req, res) => {
  console.log("Cookies", req.cookies) 

  // Set cookie
  res.cookie('hive', 'streaming', { sameSite: 'none' })
  res.redirect('http://hiveapp:3030/index.html')
})

app.listen(port, () => {
  console.log(`App started on ${port}`)
})

hiveApp.listen(hivePort, () => {
  console.log(`Hive app started on ${hivePort}`)
})
