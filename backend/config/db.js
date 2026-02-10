import mongoose from 'mongoose';

let isDbConnected = false;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isDbConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    isDbConnected = false;
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('🔁 Retrying MongoDB connection in 5 seconds...');

    setTimeout(connect, 5000);
  }
};

export const connectDB = async () => {
  await connect();
};

export const getDbStatus = () => ({
  connected: isDbConnected,
  mongooseState: mongoose.connection.readyState
});
