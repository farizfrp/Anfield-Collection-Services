const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://farizaldo:Smpn21bekasi@cluster0-kq9t0.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
console.log("run")
client.connect(err => {
    console.log("Connected mongo gan")
    console.log(err)
  const collection = client.db("anfield").collection("accounts");
  // perform actions on the collection object
  client.close();
});