var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
const DUMMY_ARTIST = {
  name: 'Dummy name',
  description: 'Dummy description',
  image: 'null'
};

MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) throw err;

  var dbo = db.db('mean_db');
  console.log('Database connection');

  //Create artsts collection
  dbo.createCollection('artists', (err, res) => {
    if (err) throw err;
    console.log('New document added');

    dbo.collection('artists').insertOne(DUMMY_ARTIST, (err, res) => {
      if (err) throw err;
      dbo.collection('artists').find({}).toArray((err, res) => {
        console.log(`${res}`);
        db.close();
      });
    });
  });
});
