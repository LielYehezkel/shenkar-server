import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courses';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// יותר לוגים לבדיקת החיבור
console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:Ll123123@cluster1.l2ff4.mongodb.net/Shenkar', {
  serverSelectionTimeoutMS: 30000,  // זמן ארוך יותר לחיבור
  socketTimeoutMS: 45000,           // זמן ארוך יותר לפעולות
  connectTimeoutMS: 30000,          // זמן ארוך יותר להתחברות ראשונית
})
.then(() => {
  console.log('Successfully connected to MongoDB!');
  console.log('Database name:', mongoose.connection.name);
  console.log('Database host:', mongoose.connection.host);
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  console.error('Error details:', {
    name: error.name,
    message: error.message,
    code: error.code
  });
});

// בדיקה שהראוטים עובדים
app.use('/api/courses', courseRoutes);
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});