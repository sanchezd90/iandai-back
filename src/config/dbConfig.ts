import mongoose from 'mongoose';

const connectToDatabase = async (): Promise<void> => {
  // Connect to MongoDB
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;
  const db_name = process.env.DB_NAME as string;

  const uri: string = `mongodb+srv://${username}:${password}@cluster0.tcz8xzq.mongodb.net/${db_name}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export { connectToDatabase }; 