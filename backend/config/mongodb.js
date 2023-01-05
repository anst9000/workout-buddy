const mongoose = require('mongoose')

const connectDB = async () => {
  let SUCCESS = false

  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    SUCCESS = true
  }
  catch (error) {
    console.log(error)
    process.exit(1)
  }

  return SUCCESS
}

module.exports = connectDB