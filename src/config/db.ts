import mongoose from 'mongoose'


const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Mongoose default connection open to ' + mongoose.connection.name);
    });

    await mongoose.connect("mongodb://127.0.0.1:27017/SIH_test", 
      {
        serverSelectionTimeoutMS: 30000,       
      }
    )
    console.log('MongoDB Connected 🚀')
    console.log('Connected to database:', mongoose.connection.name);
    
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export default connectDB
