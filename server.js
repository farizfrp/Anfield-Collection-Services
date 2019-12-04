
const express = require('express');

const pino = require('express-pino-logger')();

const firebase = require('firebase');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
const firebaseConfig = {
  apiKey: "AIzaSyAqCyweTU7W-2JbOTcdEYpU8a8z-QYyf_c",
  authDomain: "fir-reactnative-e4275.firebaseapp.com",
  databaseURL: "https://fir-reactnative-e4275.firebaseio.com",
  projectId: "fir-reactnative-e4275",
  storageBucket: "fir-reactnative-e4275.appspot.com",
  messagingSenderId: "144876078188",
  appId: "1:144876078188:web:d844eac240afb72d96c449",
  measurementId: "G-8ESQJH5QXQ"
};
firebase.initializeApp(firebaseConfig);
//var storage = firebase.storage();
app.use(pino);
app.listen(3001, () =>
  console.log('Expressxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxserver is running on localhost:3001')
);
var data;
const midtransKey = 'U0ItTWlkLXNlcnZlci1BZGtQRWgtZ21na3RtbnpXWVQ0aFUzeXU6'
ref = firebase.firestore().collection('products');
const MONGO = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
const asyncHandler = require('express-async-handler')



var https = require("https");
var fs = require("fs");
var productStatusActive= {'userstatus':'active','productstatus':'active'}
async function generateInvoice(invoice, filename, success, error) {
  
  var postData = JSON.stringify(invoice);
  var options = {
    hostname: "invoice-generator.com",
    port: 443,
    path: "/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData)
    }
  };

  var file = fs.createWriteStream(filename);

  var req = https.request(options, function (res) {
    res.on('data', function (chunk) {
      file.write(chunk);
    })
      .on('end', function () {
        file.end();
       
        upoload(filename);
        if (typeof success === 'function') {
         

        }
      });
  });
  req.write(postData)//.then(()=>{success();});
  req.end();

  if (typeof error === 'function') {
    req.on('error', error);
  }
}

var invoice = {
  logo: "https://i.ibb.co/NV6kgT6/ic-launcher.png",
  from: "Invoiced\nMerchant\nFILKOM",
  to: "Fariz Default",
  currency: "idr",
  number: "INV-0001",
  payment_terms: "BCA Virtual Account",
  items: [
    {
      name: "Subscription to Starter",
      quantity: 1,
      unit_cost: 50
    }
  ],

  notes: "Terimakasih Telah berbelanja di Anfield Collection",
  terms: "Alamat : "
};

const longUri='mongodb://farizaldo:Smpn21bekasi@cluster0-shard-00-00-kq9t0.mongodb.net:27017/test?ssl=true&authSource=admin&retryWrites=true&w=majority';
const shareGrid = "mongodb://admin:qL1q06Tm73ddUNAU@SG-anfieldcollection-28478.servers.mongodirector.com:27017/admin";
var uriLocal ="mongodb://localhost:27017/mydb";
var uriCloud ="mongodb://anfield1:Smpn21bekasi@cluster0-kq9t0.gcp.mongodb.net/test?ssl=true&authMechanism=SCRAM-SHA-1&authSource=admin&retryWrites=true&w=majority";
//var uriCloud ="mongodb+srv://anfield1:Smpn21bekasi@cluster0-kq9t0.gcp.mongodb.net/test?retryWrites=true&w=majority&ssl=true";

var db; connectDB();
async function connectDB() {
  db = await MONGO.connect(longUri,{ useNewUrlParser: true });
  console.log("Connected")
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;

}

async function productlList(role) {
  // const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('products');

  //  MyCollection.insert(dataDummy);
var query = (role=='admin')?{}:productStatusActive
Object.assign(query, {merchant:{$ne:''},'quantityproduct':{$gt:0}});

  const result = await MyCollection.aggregate([
    {$match: query},{
      $lookup: {
        from: 'accounts',
        localField: 'merchant',
        foreignField: 'id',
        as: 'merchantname'
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$merchantname", 0] }, "$$ROOT"] } }
    },
    { $project: { merchantname: 0,  isMerchant: 0, } }
  ]).toArray();
var newResult = result.map(res =>{res.price = new Intl.NumberFormat().format(res.price)})
  //  res.send(result);

  return result;
}

async function categories() {
  // const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('categories');

  //  MyCollection.insert(dataDummy);

  const result = await MyCollection.find().toArray();

  //  res.send(result);

  return result;
}

async function categoriesType(type) {
  // const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('categories');

  //  MyCollection.insert(dataDummy);

  const result = await MyCollection.find({"type":type}).toArray();

  //  res.send(result);

  return result;
}
app.get('/', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

 await connectDB()
 res.send('connected');
   
}))
app.get('/getProductList', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

  const x = await productlList('user');
  for(let i = x.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = x[i]
    x[i] = x[j]
    x[j] = temp
  }
  res.send(JSON.stringify(x));
   
}))
app.get('/getAdminProductList', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

  const x = await productlList('admin');
  res.send(JSON.stringify(x));
  
}))
app.get('/getCategories', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

  const x = await categories();
  res.send(JSON.stringify(x));
   
}))

app.post('/getCategoriesType', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

  const x = await categoriesType(req.body.type);
  res.send(JSON.stringify(x));
   
}))

async function getMerchantName(name) {
  // const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('accounts');
  const project = { fields: { username: 1,shipping : 1} }
  //  MyCollection.insert(dataDummy);
  const result = await MyCollection.findOne({ 'id': name }, project);

  //  res.send(result);

  return result;
}

app.post('/getMerchantName', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  name = req.body.name;
  
  const x = await getMerchantName(name);
   
  res.send(JSON.stringify(x));
   
}))



app.post('/getMerchantOrders', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

  merchant=req.body.data.merchant;
  start=req.body.data.start;
  end=req.body.data.end;
  const x = await getMerchantOrders(merchant,"2019-11-02T17:00:00.000+00:00","2333-12-05T17:00:00.000+00:00");
  res.send(x);
  
}))
async function getMerchantOrders(merchant,start,end){
  //"dt" : {"$gte": new Date("2013-10-01T00:00:00.000Z")}
  const dbo = db.db("anfield");
const status = "settlement";
  const MyOrders = dbo.collection('orders');
  const project =  { 
    products: { $elemMatch : { "title" : merchant } },created_on:1,'payment.transaction_status':1,id:1,userid:1,username:1
}  
 // const merchant=merchant; ,  "payment.transaction_status": status 

 return await MyOrders.find( { "products.title": merchant ,"payment.transaction_status":'settlement',"created_on":
 {
   $gte: new Date(start),
   $lte: new Date(end)
}},{projection: project}

).toArray()
  return await MyOrders.find( { "products.title": merchant ,"payment.transaction_status":'settlement',"created_on":
  {
    $gte: new Date(start),
    $lte: new Date(end)
}},project ).toArray() //get products order by merchant


}
async function  groupOrder(orders){
 
 // var orders = orders;
var result=[{ date: null, orders: [] ,total:0,quantity:0}];
var index=0;
var prod;
var total=0;
var quantity=0;
 
result[0].date=new Date(orders[0].created_on).toLocaleDateString();
for(var order of orders){
  prod =order.products[0];
  var id={id:order.id}
  var userid={userid:order.userid}
  var username={username:order.username}
  Object.assign(prod,order.payment,id,userid,username)
   
if(result[index].date==(new Date(order.created_on)).toLocaleDateString()){
 
result[index].orders.push(prod)
result[index].total=result[index].total+Number(prod.total)
result[index].quantity=result[index].quantity+Number(prod.quantity)
}
else{ result[index].total = new Intl.NumberFormat().format(result[index].total)
  index++;
 result[index]= { date: null, orders: [],total:0,quantity:0 }
  result[index].date=new Date(order.created_on).toLocaleDateString();
  result[index].orders.push(prod)
  result[index].total=result[index].total+Number(prod.total)
  result[index].quantity=result[index].quantity+Number(prod.quantity)
  
   
}
total=total+Number(prod.total);
quantity = quantity+prod.quantity;
}
result[index].total = new Intl.NumberFormat().format(result[index].total)
result[index].quantity = result[index].quantity
 
var res= result.reverse()
return {quantity:quantity,result:res,total:new Intl.NumberFormat().format(total)};

}
async function createSellReport(data) {
 var orders= await  getMerchantOrders(data.merchant,data.start,data.end);
 if(orders.length==0)return
  
 orders = await groupOrder(orders);

  return orders;
}

app.post('/getSellReport', asyncHandler(async (req, res) => {
  data={}
  merchant=req.body.data.merchant;
  start=req.body.data.start;
  end=req.body.data.end;
  //name = req.body.name;
  data={merchant:merchant,start:start,end:end}
  var x = await createSellReport(data);

   
  res.send(JSON.stringify(x));
  
}))


app.post('/getAdminSellReport', asyncHandler(async (req, res) => {
  data={}
  merchant=req.body.data.merchant;
  start=req.body.data.start;
  end=req.body.data.end;
  //name = req.body.name;
  data={merchant:{$ne:'xxx'},start:start,end:end}
  const x = await createSellReport(data);
   
  res.send(JSON.stringify(x));
  
}))


async function productCategory(data) {
  // const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('products');

  //  MyCollection.insert(dataDummy);
  const result = await MyCollection.find({'userstatus':'active','productstatus':'active',categories: data }).toArray();

  //  res.send(result);

  return result;
}

app.post('/getProductCategory', asyncHandler(async (req, res) => {

  const x = await productCategory(req.body.cat);
  res.send(JSON.stringify(x));
  
}))


async function findProductName(data) {
  // data;



  data = new RegExp(data, 'i')
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('products');

  const result = await MyCollection.find({ "name": { '$regex': data },'userstatus':'active','productstatus':'active' }).toArray();


  return result;
}

app.post('/getProductName', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

  const x = await findProductName(req.body.query);
  res.send(JSON.stringify(x));

}))


async function pushCart(cartItem,userId) {
  // const db = await MONGO.connect(url);
  const dbo = db.db("anfield");

  // { products: { sku : "1",title : "xxxxxx",price : "98789", } }
 
  const MyCarts = dbo.collection('carts');
  //MyCarts.updateOne( { _id: "1" }, { $push: { product:val } } )
  MyCarts.update(
    { _id: userId, 'product.id': { $ne: cartItem.id } },
    {
      $push: {
        product: cartItem
      }
    });


  return;
}



app.post('/addAddress', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
 
  const x = await pushAddress(req.body.data);

  res.send(JSON.stringify(x));

}))


async function pushAddress(val) {
  // const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
const value=val;
const id = value.id;
const address= value.address;
  // { products: { sku : "1",title : "xxxxxx",price : "98789", } }

  const MyCollection = dbo.collection('accounts');
  MyCollection.updateOne( { id: id }, { $push: { shipping:address } } )



  return;
}

async function updateProductQuantity(orders) {

  for (const order of orders) {
    //const db = await MONGO.connect(url);
    const dbo = db.db("anfield");
    const MyCollection = dbo.collection('products');
    var products = await MyCollection.find({ id: order.id }).toArray();
    result = false;

    sum = Number(products[0].quantityproduct) - Number(order.quantity);
    sell = Number(products[0].sell) + Number(order.quantity);
    
    if (sum >= 0) {
     
      MyCollection.updateOne({ id: order.id }, { $set: { "quantityproduct": sum, "sell": sell } })
      result = true;
    }


  };

  return result;


}

app.post('/addCart', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
const cartItem = req.body.cartItem
const userId = req.body.userId

   
  const x = await pushCart(cartItem,userId);

  res.send(true);
 


}))

async function pushProduct(data) {

  const dbo = db.db("anfield");
  data.sell = 0;
  const MyCollection = dbo.collection('products');
  MyCollection.insert(data);


  return;
}
async function addCart(){



}
app.post('/addCart', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

   
  const x = await addCart(req.body);
  res.send(req.body);
   
}))

app.post('/addProduct', asyncHandler(async (req, res) => {
  
  const x = await pushProduct(req.body);
  res.send(req.body);
 
}))

async function pushAccount(data) {

  const dbo = db.db("anfield");
  data.role ="user"
data.status='active'
  const MyCarts = dbo.collection('accounts');
  MyCarts.insert(data);


  return;
}

app.post('/addAccount', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

   
  const x = await pushAccount(req.body);
  res.send(req.body);
 
}))




async function getAddress(id) {

  const dbo = db.db("anfield");

  const Accounts = dbo.collection('accounts');
  return await Accounts.find({ id: id }).toArray();



}

app.post('/getAddress', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

 
  const x = await getAddress(req.body.userid);
  res.send(x);
 
}))



async function breakOrder(data) {
  result = [];
  for (const value of data) {
 
    for (const product of value.data) {

      result.push(product)


    }






  }
  console.log(result);
  return result;


}


async function createTracking(product) {
  shipping = product.shipping;
  code = shipping.courier;
  origin = shipping.origin;
  destination = shipping.destination;
  timestamp = + new Date();
  trackingnumber = code + origin + destination + timestamp;
  return trackingnumber;
}
async function createShipping(products) {
  index = 0;
  var status="notinserted"
  for (const product of products) {
    trackingnumber = await createTracking(product);
    products[index].shipping.trackingnumber = trackingnumber;
    products[index].shipping.status=status;
  
    index++;
  }
  return products;
}
async function pushOrder(data) {
  data.created_on=new Date();
  const dbo = db.db("anfield");
  const breakData = await breakOrder(data.products);
  
  const isUpdated = await updateProductQuantity(breakData);


  const MyOrders = dbo.collection('orders');

  const MyCarts = dbo.collection('carts');
  
  data.products = await createShipping(data.products);
  const result = await createPayment(breakData, data.products);
  
  data.payment = result.payments;
// console.log("payment Created = ",result.payments);
  data.products = result.orders;
  data.total=data.payment.gross_amount;
  data.id = data.payment.order_id
  MyOrders.insert(data);
  //  MyCollection.insert(dataDummy);
  await MyCarts.updateOne({ _id: data.userid }, { $set: { product: [] }})
 // console.log('Push Order Finished');
  //  res.send(result);

  return isUpdated;
}
async function createPayment(data, orders) {
  //   const db = await MONGO.connect(url);
  //   const dbo = db.db("anfield");
  //  // { products: { sku : "1",title : "xxxxxx",price : "98789", } }
  var payment = {
    payment_type: "bank_transfer",
    transaction_details: {
      gross_amount: 44000,
      order_id: "farizapp-" + makeid(8)
    },
    customer_details: {
      email: "fariz.aldo@example.com",
      first_name: "Fariz",
      last_name: "Reynaldo",
      phone: "+6281 1234 1234"
    },
    item_details: [
      {
        id: "item01",
        price: 21000,
        quantity: 1,
        name: "Ayam Zozozo"
      },
      {
        id: "item02",
        price: 23000,
        quantity: 1,
        name: "Ayam Xoxoxo"
      }
    ],
    bank_transfer: {
      bank: "bca",
      va_number: "12345678901",
      free_text: {
        inquiry: [
          {
            id: "Your Custom Text in ID language",
            en: "Your Custom Text in EN language"
          }
        ],
        payment: [
          {
            id: "Your Custom Text in ID language",
            en: "Your Custom Text in EN language"
          }
        ]
      }
    }
  }

  var total=0;
  var quantity=0;
  for (var ship of orders) {
    ship = ship.shipping;
    data.push({
      id: ship.trackingnumber,
      price: ship.deliveryfee,
      quantity: 1,
      name: "shipping cost"
    })
total=total+ship.deliveryfee;
  }
  var index=0;
  
  for (var prod of orders) {
   // invoice.from = prod.merchantname;
    orders[index].total=0;quantity
    orders[index].quantity=0;
   // orders.total=0;
    var indexItem = 0;
    for (var item of prod.data) {
        orders[index].data[indexItem].total=item.quantity*item.price;
        orders[index].total=orders[index].total+orders[index].data[indexItem].total;
        orders[index].quantity=orders[index].quantity+orders[index].data[indexItem].quantity;

     
      indexItem++;

    }
   total=total+orders[index].total;
   quantity=total+orders[index].total;
index++;
  }
  payment.transaction_details.gross_amount = total

  payment.item_details = data;
  //console.log("payment.transaction_details.gross_amount" + payment.transaction_details.gross_amount)
  //   const MyCarts = dbo.collection('orders');
//console.log("payment = ",payment)
  await fetch('https://api.sandbox.midtrans.com/v2/charge', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': midtransKey
    },
    body: JSON.stringify(payment)
  }).then((response) =>  response.json()).then((responseJSON) => {
    payment =responseJSON;
   
 });;
 



  
  return {payments:payment,orders:orders};
}

app.post('/addOrder', asyncHandler(async (req, res) => {


  //console.log('updating Product');
  const x = await pushOrder(req.body);
  res.send(req.body);
  //console.log('updated Product');
}))

async function createInvoiceNumber(merchantid, orderid) {
  var result = merchantid + orderid + (+new Date());
  return result;


}



async function upoload(filename) {

  const { Storage } = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage({
    projectId: 'fir-reactnative-e4275',
    keyFilename: 'firebasereactnative-985ce43de037.json'
  });

  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const bucketName = 'fir-reactnative-e4275.appspot.com';
  var BUCKET_NAME = 'fir-reactnative-e4275.appspot.com'
  // https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket
  var myBucket = storage.bucket(BUCKET_NAME)
  myBucket.makePublic(function(err) {console.log("error",err)})
  //var file = myBucket.file('myImage.png')

  let localFileLocation = './' + filename;

  myBucket.upload(localFileLocation, { destination: "invoice/" + filename })
    .then(file => {
       
    })




}

//createBucket();


async function doInvoice(id) {
  const dbo = db.db("anfield");
  const MyOrders = dbo.collection('orders');
  var order = await MyOrders.findOne({ "payment.order_id": id });
   
  var products = order.products;
  invoice.to = await getMerchantName(order.userid);
  invoice.to = invoice.to.username;
  for (var prod of products) {
    invoice.from = "Toko "+prod.merchantname;
    
    invoice.number = await createInvoiceNumber(prod.title, order.id);
    invoice.terms ="Alamat : "+ prod.shipping.destinationAddress;
    var index = 0;
    for (var item of prod.data) {
      var res = {
        name: item.name,
        quantity: item.quantity,
        unit_cost: item.price
      }

      invoice.items[index] = res;
      index++;

    }  
    invoice.items[index] = {
      name: prod.shipping.courier + " - " + prod.shipping.service + " - " + prod.shipping.weight + " grams",
      quantity: 1,
      unit_cost: prod.shipping.deliveryfee
    };
     
    index = 0
    var filename = invoice.number + '.pdf';
    await generateInvoice(invoice, filename);
    MyOrders.update(
      {
        "id": order.id,
        "products.title": prod.title,
      },
      {
        $set: { "products.$.invoice": "https://storage.cloud.google.com/fir-reactnative-e4275.appspot.com/invoice/" + filename }
      }
    )
    //await uploadInvoice(invoice.number+'.pdf');
    invoice.terms ='';
    invoice.items = [];
    console.log("generated")

  }


}


async function isPaymentChanged(){



}
app.post('/checkPayment', asyncHandler(async (req, res) => {
  console.log("checkPayment")
  const dbo = db.db("anfield");
  const MyOrders = dbo.collection('orders');
const orderId= req.body.order_id

 
  const oldPayment =await MyOrders.findOne({id:orderId});
  if(!oldPayment) {res.send('notFound'); return;}
  const oldStatus = oldPayment.payment.transaction_status;
   
  if (oldStatus=='settlement'){res.send('notUpdated'); return;}
  const payment = await checkPayment(orderId);

  const newStatus = payment.transaction_status;
if(oldStatus == newStatus) {res.send('notUpdated'); return;}


await doInvoice(orderId);
 
 
  await MyOrders.updateOne({ "payment.order_id": orderId }, { $set: { "payment": payment } })
  //var products = await MyOrders.find( { "products.title": "spPR3mbUETQ6aeXwtNuSdyxzIbV2" }, { created_on:0,shipping:0,payment:0,_id:0, products: { $slice: -1 } } ).pretty()

  const newOrder =await MyOrders.findOne({id:orderId});
  res.send(newOrder);
  //res.sendFile(path.join(__dirname + '/7CyywgRXU2O3Hi5hFt1WE0HCLR03farizapp-3PsUtwsl1572291821966.pdf'));
   
}))



app.post('/updateCategories', asyncHandler(async (req, res) => {


const type=req.body.type;
const value=req.body.value;
  


  const dbo = db.db("anfield");
  const MyCategories = dbo.collection('categories');
  MyCategories.updateOne({ "type": type }, { $set: { "value": value } })
  //var products = await MyOrders.find( { "products.title": "spPR3mbUETQ6aeXwtNuSdyxzIbV2" }, { created_on:0,shipping:0,payment:0,_id:0, products: { $slice: -1 } } ).pretty()


  res.send("berhasil");
  //res.sendFile(path.join(__dirname + '/7CyywgRXU2O3Hi5hFt1WE0HCLR03farizapp-3PsUtwsl1572291821966.pdf'));
  
}))


async function updateProduct(product){
  const id = product.id

  const dbo = db.db("anfield");
  const MyCategories = dbo.collection('products');
  MyCategories.updateOne({ "id": id }, { $set: {name:product.name,
    description:product.description,
    shipping_details:product.shipping_details,
    quantityproduct:product.quantityproduct,
    price:product.price,
    imageURL:product.imageURL,
    categories:product.categories,
  productstatus:product.productstatus}  })
  //var products = await MyOrders.find( { "products.title": "spPR3mbUETQ6aeXwtNuSdyxzIbV2" }, { created_on:0,shipping:0,payment:0,_id:0, products: { $slice: -1 } } ).pretty()



  //res.sendFile(path.join(__dirname + '/7CyywgRXU2O3Hi5hFt1WE0HCLR03farizapp-3PsUtwsl1572291821966.pdf'));
 
}

app.post('/updateProduct', asyncHandler(async (req, res) => {


  
  const product=req.body.product;
   
   await updateProduct(product);
  
   res.send('hahaha');
    
  }))
app.post('/filterPrice', asyncHandler(async (req, res) => {
  
  rangefilter = {
    greatThan: req.body.greatThan,
    lessThan: req.body.lessThan

  }


  const result = await filterPrice(rangefilter);


  res.send(result);

}))
async function filterPrice(rangefilter) {
  var range = {
    greatThan: Number(rangefilter.greatThan),
    lessThan: Number(rangefilter.lessThan)

  }
  const dbo = db.db("anfield");
  const MyProducts = dbo.collection('products');
  const project = { options: { price: { $lt: range.lessThan, $gt: range.greatThan } } }
  //  MyCollection.insert(dataDummy);
  var result = await MyProducts.find({ price: { $lt: range.lessThan, $gt: range.greatThan } }).toArray();
  
  return result;
}

async function checkPayment(idorder) {

  var newStatus;
  await fetch('https://api.sandbox.midtrans.com/v2/' + idorder + '/status', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': midtransKey
    }
  }).then((response) => newStatus = response.json());

  return newStatus;
}


async function pullCart(productId,userId) {
  //const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  // { products: { sku : "1",title : "xxxxxx",price : "98789", } }
  const MyCarts = dbo.collection('carts');
  MyCarts.updateOne({ _id: userId }, { $pull: { product: { id: productId } } })


  return;
}

app.post('/pullCart', asyncHandler(async (req, res) => {
const productId = req.body.productId;
const userId = req.body.userId;
  const x = await pullCart(productId,userId);
  res.send('berhasil SKUSKUSKU= ' + req.body.id);

}))


async function pullAddress(val) {
  //const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  // { products: { sku : "1",title : "xxxxxx",price : "98789", } }
  const address=val.shipping;
  const id=val.id;
  const MyCollections= dbo.collection('accounts');

  MyCollections.updateOne({ id: id }, { $pull: { shipping: { name:address.name, city:address.city, address:address.address } } })

  return;
}

app.post('/pullAddress', asyncHandler(async (req, res) => {

  const x = await pullAddress(req.body.data);
  res.send('berhasil pullAddress= ' + req.body.data);

}))





app.post('/updateAddress', asyncHandler(async (req, res) => {

  const x = await updateAddress(req.body.data);
  res.send('berhasil updateAddress= ' + req.body.data);

}))

async function updateAddress(val) {
  //const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  // { products: { sku : "1",title : "xxxxxx",price : "98789", } }
  const oldAddress=val.oldAddress;
  const newAddress=val.newAddress;
  const id=val.id;
  const MyCollections = dbo.collection('accounts');

 MyCollections.updateOne({ id: id ,shipping:oldAddress}, { $set: { "shipping.$": newAddress} })

  return;
}




app.post('/updateShipping', asyncHandler(async (req, res) => {

  const x = await updateShipping(req.body.data);
  
  res.send('berhasil updateAddress= ' + req.body.data);

}))

async function updateShipping(val) {
  //const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  // { products: { sku : "1",title : "xxxxxx",price : "98789", } }
  const merchantId=val.merchantId;
  const shipping=val.shipping;
  const orderId=val.orderId;
  const MyCollections = dbo.collection('orders');

 MyCollections.updateOne({ id: orderId ,"products.title":merchantId}, { $set: { "products.$.shipping": shipping} })

  return;
}


async function CartList(userid) {

  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('carts')

  result = await MyCollection.aggregate([
    { $match: { _id: userid } },
    { $lookup: { from: "products", localField: "product.id", foreignField: "id", as: "joins" } },
    {
      $addFields: {
        product:
        {
          $map: {
            input: "$product",
            as: "e",
            in: {
              $mergeObjects: [
                "$$e",
                { $arrayElemAt: [{ $filter: { input: "$joins", as: "j", cond: { $eq: ["$$e.id", "$$j.id"] } } }, 0] }
              ]
            }
          }
        }
      }
    },
    { $project: { joins: 0 } }
  ]).toArray();



  return result;
}
// async function rar(sku,MyProductCollection){
// return await MyProductCollection.find( { "manufacture_details.sku": sku }).project({quantity:1}).toArray();



// }
app.post('/getCarts', asyncHandler(async (req, res) => {

var userid = req.body.userid;
  const carts = await CartList(userid);
  res.send(JSON.stringify(carts));

}))







async function OrderList(userid) {

  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('orders');


  const result = await MyCollection.find({userid:userid}).toArray();


  return result;
}

app.post('/getOrderList', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  const userid = req.body.userid;
  var orders = await OrderList(userid);
 orders.map((order)=>{
  order.payment.gross_amount =new Intl.NumberFormat().format(order.payment.gross_amount) ;
   order.products.map((merchantOrder)=>{
     merchantOrder.total =new Intl.NumberFormat().format(merchantOrder.total) ;
    
  merchantOrder.data.map((product)=>{
    product.price = new Intl.NumberFormat().format(product.price)
  
  })});
  // order.total=new Intl.NumberFormat().format(order.total)
  })
  orders = orders.reverse()
  res.send(JSON.stringify(orders));

}))



async function OrderListMerchant(data) {

  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('orders');


  const result = await MyCollection.find({ "products.merchant": data }).toArray();


  return result;
}

app.post('/getOrderListMerchant', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  const orders = await OrderListMerchant(req.body.cat);
   
  res.send(JSON.stringify(orders));

}))

async function ProductListMerchant(merchantId) {

  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('products');


  const result = await MyCollection.find({ "merchant": merchantId }).toArray();


  return result;
}

app.post('/getProductListMerchant', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  const products = await ProductListMerchant(req.body.merchantId);
  //console.log(JSON.stringify(products));
  res.send(JSON.stringify(products));

}))


async function getProduct() {

  (async () => {
    firebase.database().ref('/products/').once('value').then(function (snapshot) {

      data = snapshot.val();
      return snapshot.val();

      // ...
    });
  })()
}


app.post('/pullProduct', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  const products = await pullProduct(req.body.productId);


}))



async function pullProduct(productId) {

  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('products');


  const result = await MyCollection.removeOne({ "id": productId });


  return result;
}


app.get('/product', (req, res) => {

  (async () => {
    getProduct();
  })()


  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));

});


app.get('/greeting', (req, res) => {
  const name = req.query.name || 'Fariz';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    greeting: `Hello ${name}!`
  }));
});

async function getProfile(userId) {

  const dbo = db.db("anfield");

  const Accounts = dbo.collection('accounts');
  return await Accounts.findOne({ id: userId });



}

app.post('/getProfile', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
userId=req.body.userId;
  const x = await getProfile(userId);
  res.send(x);
  
}))


async function updateProfile(profile){
  const id = profile.id

  const dbo = db.db("anfield");
  const MyCategories = dbo.collection('accounts');
  MyCategories.updateOne({ id: id }, { $set: {
    username:profile.username,
    birthday:profile.birthday,
    gender:profile.gender,
    phone:profile.phone,
    imageURL:profile.imageURL,
    status:profile.status
  }  })
  //var products = await MyOrders.find( { "products.title": "spPR3mbUETQ6aeXwtNuSdyxzIbV2" }, { created_on:0,shipping:0,payment:0,_id:0, products: { $slice: -1 } } ).pretty()



  //res.sendFile(path.join(__dirname + '/7CyywgRXU2O3Hi5hFt1WE0HCLR03farizapp-3PsUtwsl1572291821966.pdf'));
  
}

app.post('/updateProfile', asyncHandler(async (req, res) => {


  
  const profile=req.body.profile;
  const userId = profile.id;
  const status = profile.status;
  const isStatusChanged = req.body.isStatusChanged;
 
   await updateProfile(profile);
  if(isStatusChanged) changeProductStatusAccount(userId,status)
   res.send('hahaha');
    
  }))

  async function getProfileList() {

    const dbo = db.db("anfield");
  
    const Accounts = dbo.collection('accounts');
    return await Accounts.find().toArray();
  
  
  
  }
  
  app.get('/getProfileList', asyncHandler(async (req, res) => {
    //res.setHeader('Content-Type', 'application/json');

    const x = await getProfileList();
    res.send(x);
    
  }))

  async function changeProductStatusAccount(userId,status) {

    const dbo = db.db("anfield");
  
    const Products = dbo.collection('products');
    return await Products.updateMany({merchant:userId},{$set:{userstatus:status}});
  
  
  
  }




