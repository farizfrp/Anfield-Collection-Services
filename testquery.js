db.products.aggregate(
    { $lookup:
       {
         from: 'accounts',
         localField: 'merchant',
         foreignField: 'id',
         as: 'merchantname'
       }
     }
    ).pretty()


    db.products.aggregate([
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
     ]).pretty()

     MyCollection.aggregate([
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
    db.accounts.find({id:"EtYgk5SAmBe63ERd1WveRJZ299C2"},{username:1}).toArray();
    db.products.update(
        { _id: 1 },
        {
           $set: { item: "apple" },
           $setOnInsert: { defaultQty: 100 }
        },
        { upsert: true }
      )


      db.carts.update(
        { _id: "iL9hL2hLauoSimtkM", "comments._id": "id1"},
        { $push: { "comments.$.likes": "userID3" }}
      );


      db.products.updateMany({ },
         { $set:
            {
              sell:0
         }})

         db.orders.find( { "products.title": "spPR3mbUETQ6aeXwtNuSdyxzIbV2" },{"products":1} ).pretty()

         db.orders.find( { "products": { $elemMatch: { title: "spPR3mbUETQ6aeXwtNuSdyxzIbV2"} } } ).pretty()

         db.orders.aggregate([
            // Get just the docs that contain a shapes element where color is 'red'
            {$match: {'products.title': 'spPR3mbUETQ6aeXwtNuSdyxzIbV2'}},
            {$project: {
                products: {$filter: {
                    input: '$products',
                    as: 'product',
                    cond: {$eq: ['$$product.title', 'spPR3mbUETQ6aeXwtNuSdyxzIbV2']}
                }},
                _id: 0
            }}
        ])


        db.orders.aggregate([
         { $match: { 'products.title': 'EtYgk5SAmBe63ERd1WveRJZ299C2' }},
         { $project: {
            products: { $filter: {
                 input: '$products',
                 as: 'product',
                 cond: { $eq: ['$$product.title', 'EtYgk5SAmBe63ERd1WveRJZ299C2']}
             }},
             products: 1
         }}
       ]).pretty();


       db.orders.find( { "products.title": "EtYgk5SAmBe63ERd1WveRJZ299C2",  "payment.transaction_status": "settlement" },
           { 
               products: { $elemMatch : { "title" : "EtYgk5SAmBe63ERd1WveRJZ299C2" } }
           }
       ).pretty() //getSellReport

       db.orders.find( { "products.title": "spPR3mbUETQ6aeXwtNuSdyxzIbV2",  "payment.transaction_status": "settlement" }, { shipping:0,payment:0,_id:0, products: { $slice: -1 } } ).pretty() //get products order by merchant

       db.orders.update(
        { 
          "id" : "farizapp-iFR2q845", 
          "products.title" : "7CyywgRXU2O3Hi5hFt1WE0HCLR03", 
        
         },
        { 
          $set : { "products.$.invoice" : "https://storage.cloud.google.com/fir-reactnative-e4275.appspot.com/invoice/7CyywgRXU2O3Hi5hFt1WE0HCLR03undefined1572514643387.pdf" } 
        }
      )


      db.accounts.aggregate([
        // Get just the docs that contain a shapes element where color is 'red'
        {$match: {'status': 'active'}},
        {$lookup : {from:"products", localField:"id",foreignField:"merchant", as: "products"}},
        {$project: {
            products: {$filter: {
                input: '$products',
                as: 'product',
                cond: {$eq: ['$$product.status', 'active']}
            }},
            _id: 0
        }}
    ]).pretty()

    // getProductByUserStatus&ProductStatus


    db.products.find({userstatus:'active',productstatus:'active'}).toArray();

    db.products.updateMany({},{$set:{productstatus:'active',userstatus:'active'}})