require('dotenv').config()
const fs = require('fs');
const express = require('express');
const app = express()
const cors = require('cors')
const connectDB = require('./config/mongodb')

const logger = require('morgan')
app.use(logger('common', {stream: fs.createWriteStream('./logs/access.log', {flags: 'a'})}))
app.use(logger('dev'))

const workoutRoutes = require('./routes/workouts')

const PORT = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
if (connectDB()) {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
} else {
  console.log(`Could not connect to DB, check connections again.`)
}

