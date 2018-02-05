import config from '../config';
import mongoose from "mongoose";

var tags

// db --------------------------------------------
mongoose.connect(config.db.uri, {useMongoClient: true}, (error, db) => {
    if (error) {
        console.log('-------------------- MONGO ERROR -------------------');
        console.log(error);
        return
    }

    tags = db.collection('tags');
    tags.createIndex({
        "name": 1
    }, {
        unique: true
    })

});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));


export default mongoose

