const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const DUMMY_ARTIST = {
  name: 'Dummy name',
  description: 'Dummy description',
  image: 'null'
};

MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) throw err;

  const dbo = db.db('mean_db');
  console.log('Database connection');

  // Create artsts collection
  dbo.createCollection('artists', (errCollection, res) => {
    if (errCollection) throw errCollection;
    console.log('New document added');

    dbo.collection('artists').insertOne(DUMMY_ARTIST, (errInsert, resArtists) => {
      if (errInsert) throw errInsert;
      console.log('Artist collection created');
      db.close();
    });
  });
});
