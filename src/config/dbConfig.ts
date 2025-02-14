import mongoose from 'mongoose';

const connectToDatabase = (): mongoose.Connection => {
  // Connect to MongoDB
  const username = process.env.USERNAME as string;
  const password = process.env.PASSWORD as string;
  const db_name = process.env.DB_NAME as string;

  const uri: string = `mongodb+srv://${username}:${password}@cluster0.tcz8xzq.mongodb.net/${db_name}?retryWrites=true&w=majority`;

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const db: mongoose.Connection = mongoose.connection;

  return db;
};

export { connectToDatabase }; 