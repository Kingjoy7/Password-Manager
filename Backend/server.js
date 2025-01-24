const express = require('express')
const cors=require('cors')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const app = express()
app.use(cors())
app.use(bodyparser.json())
dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passop';
console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
const port = 3000
client.connect();

//Get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
})

//Save a password
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db('passop');
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({ success: true,result:findResult });
})

//Delete a password
app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db('passop');
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({ success: true,result:findResult });
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
