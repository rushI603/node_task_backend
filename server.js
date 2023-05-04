const express = require("express");
const PORT = process.env.PORT || 5500;
const app = express();
/************ MIDDLEVARES *************/

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/************ DATABASES *************/
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.zyx1rni.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


/************ RESPONSE *************/
app.get("/:id",(req,res)=>{
  let id=req.params.id
  if(id==1){
    async function runQuery(){
        try{
            const database = client.db("NodeTask");
            const customer = database.collection("Customer_Info");
            const query = {$and: [{"$expr":{"$lte":[{"$toDouble":"$income"},5]}},{"car":"BMW"}]}
          
            const cursor = await customer.find(query).toArray()
            res.send(cursor)
          }
          catch(err){
          }
          finally{
            // await client.close()
          
        }
      }
      runQuery();

  }
  else if(id==2){
    async function runQuery(){
      try{
          const database = client.db("NodeTask");
          const customer = database.collection("Customer_Info");
          const query = {$and: [{"gender":{"$ne":"Female"}},{"$expr":{"$lt":[{"$toDouble":"$phone_price"},10000]}}]}
        
          const cursor = await customer.find(query).toArray()
          res.send(cursor)
        }
        catch(err){
        }
        finally{
          // await client.close()
        
      }
      }
      runQuery();
  }
  else if(id==3){
    async function runQuery(){
      try{
          const database = client.db("NodeTask");
          const customer = database.collection("Customer_Info");
          const query = {$and: [{last_name:/^M/},{$expr:{$gt:[{$strLenCP:"$quote"},15]}},{$expr:{$regexMatch:{input:"$email",regex:"$last_name",options:"i"}}}]}
        
          const cursor = await customer.find(query).toArray()
          res.send(cursor)
        }
        catch(err){

        }
        finally{
          // await client.close()
        
      }
    }
    runQuery();

    // {$expr:{$regexMatch:{input:"$email",regex:"$last_name",options:"i"}}}
  }
  else if(id==4){
      async function runQuery(){
        try{
            const database = client.db("NodeTask");
            const customer = database.collection("Customer_Info");
            const query = {$and: [{$or:[{"car":"BMW"},{"car":"Mercedes"},{"car":"Audi"}]},{"email":{"$regex":/^([^0-9]*)$/}}]}
          
            const cursor = await customer.find(query).toArray()
            res.send(cursor)
          }
          catch(err){
          }
          finally{
            // await client.close()
          
        }
      }
      runQuery();
  }
  else if(id==5){
    async function runQuery(){
      try{
          const database = client.db("NodeTask");
          const customer = database.collection("Customer_Info");
          const query = {$group:{'_id':"$city","count":{$sum:1},"avg":{$avg:{$toDouble:"$income"}}}}
        
          const cursor = await customer.aggregate([query,{$sort:{"avg":-1}},{$limit:10}]).toArray()
          // cursor.forEach((user)=>{
          //   if(user.city in data){
          //     console.log('1')
          //     data[user.city]["count"]++;
          //     data[user.city]["income"]+=user.income;
          //   }
          //   else{
          //     data[user.city]={"count":1,"income":user.income};
          //   }
          // })
          // for(city in data){
          //   data[city]["income"]=data[city]["income"]/data[city]["count"];
          // }
          cursor.forEach(data => {
            data.city=data._id
            delete data._id
          });
          
          res.send(cursor)
        }
        catch(err){
        }
        finally{
          // await client.close()
        
      }
    }
    runQuery();
    
  }
})


// if(req.body.income){
//   query.push({"$expr":{"$lte":[{"$toDouble":"$income"},req.body.income.value]}})
// }
// async function run(){
//     try{
//       const database = client.db("NodeTask");
//       const customer = database.collection("Customer_Info");
//       const query = {$and: [{"$expr":{"$lte":[{"$toDouble":"$income"},5]}},{"car":"BMW"}]}
    
//       const cursor = await customer.find(query).toArray()
//       console.log(cursor)
//     }
//     catch(err){
//         console.log(err)
//     }
//     finally{
//       await client.close()
//     }
// }
app.listen(PORT,()=>console.log(`connected at port ${PORT}`))