import mongoose from 'mongoose';

const dbPath = 'mongodb://localhost/test';

import './list';

const database = () => {
  mongoose.connect(dbPath)
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(dbPath)
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB ', dbPath)
  })
}

database();

export const List = mongoose.model('List');
