const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const PORT = 3000;
const client = new MongoClient("mongodb://localhost:27017/Task-manger");

client.connect().
then(()=>{
    console.log('connected to mongoBD');
}).catch(error=>{
    console.log(`failed to connect mongo`, error);
})
app.listen(PORT,()=>{
    console.log(`server is running on port${PORT}`);
})
