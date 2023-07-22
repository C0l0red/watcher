const mongoose = require('mongoose');

export const MONGO_URI =
  'mongodb+srv://red:Gr8yQK8eXx5-8AN@cluster0.qwck5dz.mongodb.net/service-watcher?retryWrites=true&w=majority';

export const mongoConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = () => {
  mongoose
    .connect(MONGO_URI, mongoConnectOptions)
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error: Error) => {
      console.log('Database connection failed. Exiting...');
      console.log(error);
      process.exit(1);
    });
};

export default connect;
