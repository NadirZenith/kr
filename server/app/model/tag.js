// app/models/tag.js

import mongoose from 'mongoose';
// import logger from '../../utils/logger';

// define the schema for our user model
const tagSchema = new mongoose.Schema({
  name: {
    type: String, unique: true, required: true, dropDups: true,
  },
  slug: {
    type: String, unique: true, required: true,
  },
});

// tagSchema.pre('save', function(next) {
//     // this.set('slug', 'test');
//     // logger('dev').log(this)
//     console.log(' --------------------- ')
//     // console.log(this.name)
//     next();
// });

export default mongoose.model('Tag', tagSchema);
