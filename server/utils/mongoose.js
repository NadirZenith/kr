import mongoose from 'mongoose';
import config from '../config';

let tags;

// db --------------------------------------------
mongoose.connect(config.db.uri, { useMongoClient: true }, (error, db) => {
  if (error) {
    console.log('-------------------- MONGO ERROR -------------------');
    console.log(error);
    return;
  }

  tags = db.collection('tags');
  tags.createIndex({
    name: 1,
  }, {
    unique: true,
  });
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

export default mongoose;

