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
  console.log('Express server is running on localhost:3001')
);
var data;
ref = firebase.firestore().collection('products');
const MONGO = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
const asyncHandler = require('express-async-handler')


var dataDummy = {
  sku: "111445GB3",
  title: "Simsong One mobile phone",
  description: "The greatest Onedroid phone on the market .....",

  manufacture_details: {
    model_number: "A123X",
    release_date: "111111"
  },
  categories: ["kulit buaya", "handmade"],
  shipping_details: {
    weight: 350,
    width: 10,
    height: 10,
    depth: 1
  },

  quantity: 89,
  price: 1000,
  imageURL: ["https://ecs7.tokopedia.net/img/cache/700/product-1/2017/9/20/197438636/197438636_cdc50dc9-ac61-4c46-99b9-3ca333ccbf42_2048_0",
    "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/9/20/197438636/197438636_8ec7cc9f-8e2c-4f13-80cb-64943cebb369_2048_0",
    "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/9/20/197438636/197438636_17575d92-9a8f-4482-8bf4-2cdf62ed0fc9_2048_0"
  ],

};
var https   = require("https");
var fs      = require("fs");

async function generateInvoice(invoice, filename, success, error) {
    var postData = JSON.stringify(invoice);
    var options = {
        hostname  : "invoice-generator.com",
        port      : 443,
        path      : "/",
        method    : "POST",
        headers   : {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData)
        }
    };

    var file = fs.createWriteStream(filename);

    var req = https.request(options, function(res) {
        res.on('data', function(chunk) {
            file.write(chunk);
        })
        .on('end', function() {
            file.end();

            if (typeof success === 'function') {
                success();
            }
        });
    });
    req.write(postData);
    req.end();

    if (typeof error === 'function') {
        req.on('error', error);
    }
}

var invoice = {
    logo: "http://invoiced.com/img/logo-invoice.png",
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
    terms: "Alamat : Filkom"
};




var db;connectDB();
async function connectDB(){
 db = await MONGO.connect(url);
console.log("connected")}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
  
}
makeid(8);
async function productlList() {
 // const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('products');

  //  MyCollection.insert(dataDummy);
 
  const result = await MyCollection.aggregate([
    {
       $lookup:   {
     from: 'accounts',
     localField: 'merchant',
     foreignField: 'id',
     as: 'merchantname'
   }
    },
    {
       $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$merchantname", 0 ] }, "$$ROOT" ] } }
    },
    { $project: { merchantname: 0 ,shipping: 0,isMerchant:0,} }
 ]).toArray();

  //  res.send(result);

  return result;
}

app.get('/getProductList', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  
  const x = await productlList();
  res.send(JSON.stringify(x));
  console.log('completed');
}))

async function getMerchantName(name) {
  // const db = await MONGO.connect(url);
   const dbo = db.db("anfield");
   const MyCollection = dbo.collection('accounts');
  const project ={fields:{username:1}}
   //  MyCollection.insert(dataDummy);
   const result = await MyCollection.findOne({'id':name},project);
 
   //  res.send(result);
 
   return result;
 }

app.post('/getMerchantName', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  name = req.body.name;
  //console.log("getMerchantName",name)
  const x = await getMerchantName(name);
  console.log("getMerchantName",x)
  res.send(JSON.stringify(x));
  console.log('completed');
}))

async function productCategory(data) {
 // const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('products');
 
  //  MyCollection.insert(dataDummy);
  const result = await MyCollection.find({ categories:data }).toArray();

  //  res.send(result);

  return result;
}

app.post('/getProductCategory', asyncHandler(async (req, res) => {
 
  const x = await productCategory(req.body.cat);
  res.send(JSON.stringify(x));
  console.log('getProductCategory');
}))


async function findProductName(data) {
  // data;
  
 
 
 data =new RegExp(data,'i')
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('products');
 
  const result = await MyCollection.find({"name":{ '$regex':data}}).toArray();

 
  return result;
}

app.post('/getProductName', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');

  const x = await findProductName(req.body.query);
  res.send(JSON.stringify(x));

}))


async function pushCart(val) {
 // const db = await MONGO.connect(url);
  const dbo = db.db("anfield");

 // { products: { sku : "1",title : "xxxxxx",price : "98789", } }

  const MyCarts = dbo.collection('carts');
 //MyCarts.updateOne( { _id: "1" }, { $push: { product:val } } )
  MyCarts.update(
    {_id : "1", 'product.id': {$ne: val.id}}, 
    {$push: {
         product: val
       }
    });


  return;
}

async function updateProductQuantity(orders){

for(const order of orders)  {
  //const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('products');
   var products = await MyCollection.find({id:order.id}).toArray();
  result=false;
  
  sum = Number(products[0].quantityproduct)-Number(order.quantity);
  sell = Number(products[0].sell)+Number(order.quantity);
  console.log("SUM = " + products[0].quantityproduct+ - order.quantity + " = "+ sum);
  console.log("updatedProductQuantity");
if(sum >=0){
 console.log("sum Terpanggil")
  MyCollection.updateOne( { id: order.id },  { $set: { "quantityproduct" : sum,"sell" :sell} } )
  result=true;
}

 
};

return result;


}

app.post('/addCart', asyncHandler(async (req, res) =>{
  //res.setHeader('Content-Type', 'application/json');
  
  
  console.log("data = "+req.body);
  console.log('updating cart');
  const x = await pushCart(req.body);
  
 res.send(true);
  console.log('updated cart');


}))

async function pushProduct(data) {
 
  const dbo = db.db("anfield");

  const MyCarts = dbo.collection('products');
  MyCarts.insert(data);


  return;
}

app.post('/addProduct', asyncHandler(async (req, res) =>{
  //res.setHeader('Content-Type', 'application/json');
 
  console.log('updating Product');
  const x = await pushProduct(req.body);
  res.send(req.body);
  console.log('updated Product');
}))

async function pushAccount(data) {
 
  const dbo = db.db("anfield");

  const MyCarts = dbo.collection('accounts');
  MyCarts.insert(data);


  return;
}

app.post('/addAccount', asyncHandler(async (req, res) =>{
  //res.setHeader('Content-Type', 'application/json');
 
  console.log('updating Product');
  const x = await pushAccount(req.body);
  res.send(req.body);
  console.log('updated Product');
}))




async function getAddress(id) {
 
  const dbo = db.db("anfield");

  const Accounts = dbo.collection('accounts');
  return await Accounts.find({id:id}).toArray();


 
}

app.post('/getAddress', asyncHandler(async (req, res) =>{
  //res.setHeader('Content-Type', 'application/json');
 
  console.log('updating getAddress');
  const x = await getAddress(req.body.userid);
  res.send(x);
  console.log('updated getAddress', x);
}))


async function breakOrder(data) {
  result=[];
  for(const value of data)  {
    console.log("value");
    console.log(value.data);
    console.log("value");
    for(const product of value.data)  {

result.push(product)


    }






  }
console.log(result);
return result;


}

  
  async function createTracking(product){
    shipping = product.shipping;
    code=shipping.courier;
    origin=shipping.origin;
    destination=shipping.destination;
    timestamp= + new Date();
    trackingnumber =  code+origin+destination+timestamp;
return trackingnumber;
 }
 async function createShipping(products){
index=0;
  for (const product of products ){
  trackingnumber =   await createTracking(product);
 products[index].shipping.trackingnumber = trackingnumber;
 console.log("TrackingNumber",products[index].shipping);
index++;
  }
return products;
  }
async function pushOrder(data) {
 
  const dbo = db.db("anfield");
 const breakData= await breakOrder(data.products);
 console.log(breakData);
 const isUpdated = await updateProductQuantity(breakData);

  
  const MyOrders = dbo.collection('orders');
  
  const MyCarts = dbo.collection('carts');
  data.products= await createShipping(data.products);
 data.payment=await createPayment(breakData,data.products);
 MyOrders.insert(data);
  //  MyCollection.insert(dataDummy);
  await MyCarts.updateOne( { _id: "1" }, { $pull: { product:{} } } )
  console.log('Push Order Finished');
  //  res.send(result);

  return isUpdated;
}
async function createPayment(data,shipping) {
//   const db = await MONGO.connect(url);
//   const dbo = db.db("anfield");
//  // { products: { sku : "1",title : "xxxxxx",price : "98789", } }
payment = {
  payment_type: "bank_transfer",
  transaction_details: {
      gross_amount: 44000,
      order_id: "farizapp-"+makeid(8)
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
 bank_transfer:{
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

for(var ship of shipping){
  ship=ship.shipping;
data.push( {
  id: ship.trackingnumber,
  price: ship.deliveryfee,
  quantity: 1,
  name: "shipping cost"
})

}

payment.transaction_details.gross_amount=await data.reduce(function(prev, cur) {
  return prev + (Number(cur.price)*Number(cur.quantity));
}, 0);
payment.item_details=data;
console.log("payment.transaction_details.gross_amount"+payment.transaction_details.gross_amount)
//   const MyCarts = dbo.collection('orders');

 await fetch('https://api.sandbox.midtrans.com/v2/charge', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'U0ItTWlkLXNlcnZlci1QZnVQdkhyTGw4czBPZDNoSXlJVTh3amc6'
       },
       body: JSON.stringify(payment)
     }).then((response) => payment=response.json());
console.log("payment Created");
 return payment;
}

app.post('/addOrder', asyncHandler(async (req, res) =>{

 
  console.log('updating Product');
  const x = await pushOrder(req.body);
  res.send(req.body);
  console.log('updated Product');
}))

async function createInvoiceNumber(merchantid,orderid){
var result = merchantid+orderid+(+new Date());
return result;


}
async function uploadInvoice(filename) {
  
  var onSuccess;
 // console.log( this.state.photo.uri);
  //console.log(  outPut+this.state.fileName.toString());
     
        
        //console.log("REZIZED = "+ res.path);
         //res.sendFile(path.join(__dirname + '/7CyywgRXU2O3Hi5hFt1WE0HCLR03farizapp-3PsUtwsl1572291821966.pdf'));
       var fileName= '/'+filename;
          // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
          var uploadTask =    firebase.storage().ref(fileName).putFile(path.join(__dirname + fileName));
  
        uploadTask.on('state_changed', function(snapshot){
         onSuccess=snapshot;
       console.log(snapshot.bytesTransferred);
            
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
           
          }, function(error) {
            console.log('ERROR = '+ error);
            console.log('ERROR = '+ error.message);
          
            // Handle unsuccessful uploads
          }, function() {
            console.log('Upload Success beneran');
       
           
            onSuccess.ref.getDownloadURL().then(function(downloadURL) {
              data.imageURL[0]=downloadURL;
              console.log('File available at', downloadURL);
              Alert.alert(
                'Berhasil !!!',
                'Invoice Berhasil Di Upload',
                [
                  
                  
                  {text: 'Ya', onPress: () => {return }},
                ],
                {cancelable: false},
              );
            });
          });
  
  
  
  
       //   console.log("down = = = = = = ="+z.getDownloadURL());
        
  
  
    
        }

async function doInvoice(id){
  const dbo = db.db("anfield");
  const MyOrders = dbo.collection('orders');
  var order = await MyOrders.findOne( { "payment.order_id":id });
  console.log("Order",order)
var products= order.products;
for(var prod of products){
invoice.from= prod.merchantname;
invoice.to="fariz Reynaldo";
invoice.number=await createInvoiceNumber(prod.title,order.id);
var index=0;
for(var item of prod.data){
var res={
name: item.name,
quantity: item.quantity,
unit_cost:item.price}

invoice.items[index]=res;
index++;

}console.log("between")
invoice.items[index]={
  name: prod.shipping.courier +" - "+prod.shipping.service+" - "+prod.shipping.weight+" grams",
  quantity: 1,
  unit_cost:prod.shipping.deliveryfee};
  console.log("item",invoice.items[index])
  index=0
await generateInvoice(invoice, invoice.number+'.pdf');
//await uploadInvoice(invoice.number+'.pdf');
invoice.items=[];
console.log("generated")

}}
var path = require('path');
app.post('/checkPayment', asyncHandler(async (req, res) =>{

  
 
  await doInvoice(req.body.idorder);
  
  const payment = await checkPayment(req.body.idorder);
  const dbo = db.db("anfield");
  const MyOrders = dbo.collection('orders');
  MyOrders.updateOne( { "payment.order_id":req.body.idorder },  { $set: { "payment" : payment } } )
  //var products = await MyOrders.find( { "products.title": "spPR3mbUETQ6aeXwtNuSdyxzIbV2" }, { created_on:0,shipping:0,payment:0,_id:0, products: { $slice: -1 } } ).pretty()
 
 
  res.send(payment);
  //res.sendFile(path.join(__dirname + '/7CyywgRXU2O3Hi5hFt1WE0HCLR03farizapp-3PsUtwsl1572291821966.pdf'));
  console.log('updated Payment');
}))

app.post('/filterPrice', asyncHandler(async (req, res) =>{
  console.log('updated result',req.body);
  
  rangefilter={
    greatThan:req.body.greatThan,
    lessThan:req.body.lessThan

  } 
  
  
  const result = await filterPrice(rangefilter);
 
 
  res.send(result);
  
}))
async function filterPrice(rangefilter){
  var range={
    greatThan:Number(rangefilter.greatThan),
    lessThan:Number(rangefilter.lessThan)

  } 
  const dbo = db.db("anfield");
  const MyProducts = dbo.collection('products');
  const project ={options:{price:{$lt:range.lessThan,$gt:range.greatThan}}}
   //  MyCollection.insert(dataDummy);
   var result = await MyProducts.find({price:{$lt:range.lessThan,$gt:range.greatThan}}).toArray();
 console.log("RES",result)
 return result;
  }

async function checkPayment(idorder){
 
var newStatus;
  await fetch('https://api.sandbox.midtrans.com/v2/'+ idorder+'/status', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'U0ItTWlkLXNlcnZlci1QZnVQdkhyTGw4czBPZDNoSXlJVTh3amc6'
    }
  }).then((response) => newStatus=response.json());

return newStatus;
}


async function pullCart(id) {
  //const db = await MONGO.connect(url);
  const dbo = db.db("anfield");
 // { products: { sku : "1",title : "xxxxxx",price : "98789", } }
  const MyCarts = dbo.collection('carts');
  MyCarts.updateOne( { _id: "1" }, { $pull: { product:{id:id} } } )
 

  return;
}

app.post('/pullCart', asyncHandler(async (req, res) =>{

  const x = await pullCart(req.body.id);
  res.send('berhasil SKUSKUSKU= '+ req.body.id );

}))





async function CartList() {
 
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('carts')

   result= await MyCollection.aggregate([
     {$match : {_id : "1"}}, 
     {$lookup : {from:"products", localField:"product.id",foreignField:"id", as: "joins"}},
     {$addFields : {product: 
         {$map : {
             input : "$product", 
             as : "e", 
             in : {$mergeObjects: [
                 "$$e",
                 {$arrayElemAt :[{$filter : {input : "$joins",as : "j", cond : {$eq :["$$e.id", "$$j.id"]}}},0]}
                 ]
             }}}
     }},
    {$project : {joins:0}}
 ]).toArray();
 


return result;
}
// async function rar(sku,MyProductCollection){
// return await MyProductCollection.find( { "manufacture_details.sku": sku }).project({quantity:1}).toArray();



// }
app.get('/getCarts', asyncHandler(async (req, res) => {

  
  const carts = await CartList();
  res.send(JSON.stringify(carts));
 
}))







async function OrderList() {
 
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('orders');

  
  const result = await MyCollection.find().toArray();


  return result;
}

app.get('/getOrderList', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  const orders = await OrderList();
  res.send(JSON.stringify(orders));

}))



async function OrderListMerchant(data) {
 
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('orders');

  
  const result = await  MyCollection.find({ "products.merchant":data }).toArray();


  return result;
}

app.post('/getOrderListMerchant', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  const orders = await OrderListMerchant(req.body.cat);
  console.log(JSON.stringify(orders));
  res.send(JSON.stringify(orders));

}))

async function ProductListMerchant(data) {
 
  const dbo = db.db("anfield");
  const MyCollection = dbo.collection('products');

  
  const result = await  MyCollection.find({ "merchant":data }).toArray();


  return result;
}

app.post('/getProductListMerchant', asyncHandler(async (req, res) => {
  //res.setHeader('Content-Type', 'application/json');
  const products = await ProductListMerchant(req.body.cat);
  console.log(JSON.stringify(products));
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

app.get('/product', (req, res) => {

  (async () => {
    getProduct();
  })()


  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));

});


// var simulateLatency = require('express-simulate-latency');
// // use as middleware for all subsequent handlers...
// var smallLag = simulateLatency({
//   min: 100,
//   max: 500
// });
// //app.use(smallLag);
// // ...or use as middleware for a specific route
// var bigLag = simulateLatency({
//   min: 5000,
//   max: 7000
// });


app.get('/greeting', (req, res) => {
  const name = req.query.name || 'Fariz';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    greeting: `Hello ${name}!`
  }));
});