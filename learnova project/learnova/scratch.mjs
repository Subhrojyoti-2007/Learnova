import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({ email: 'subhrojyotidas9e@gmail.com' });
    
    if (user) {
      console.log('User exists:', user.email);
      console.log('Password hash:', user.password);
    } else {
      console.log('User DOES NOT exist');
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

checkUser();
