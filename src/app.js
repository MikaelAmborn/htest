import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import axios from 'axios'
import cors from 'cors'

const app = express()
const port = 3000

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: 'https://mikaelamborn.github.io', credentials: true}))

app.get('/selfTest', (req, res) => {
  console.log("Cookies", req.cookies)
  console.log(`Request origin ${req.get('origin')}`)

  res.send({cookie: req.cookies})
})

app.get('/', (req, res) => {
  // Set cookie
  res.cookie('hive', 'streaming', { sameSite: 'none' })
  res.redirect('https://mikaelamborn.github.io/htest/public/index.html')
})

app.listen(port, () => {
  console.log(`App started on ${port}`)
})
