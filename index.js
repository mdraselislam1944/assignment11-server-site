const express=require('express');
const cors=require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app=express();
const port=process.env.PORT||5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.SECRET_User}:${process.env.SECRET_PASS}@cluster11.cpm08j1.mongodb.net/?retryWrites=true&w=majority`;

// console.log(process.env.SECRET_User)
// const uri='mongodb://localhost:27017';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const volunteerCollection=client.db('toyBabyDB').collection('toyBaby');
  

    app.post('/volunteer',async(req,res)=>{
        const volunteer=req.body;
        const result=await volunteerCollection.insertOne(volunteer);
        res.send(result);
    })

    app.get('/volunteer/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id: new ObjectId(id)};
      const cursor=volunteerCollection.find(query);
      const result=await cursor.toArray();
      res.send(result);
    })

    app.patch('/volunteer/:id',async(req,res)=>{
      const id=req.params.id;
      const product=req.body;
      const filter={_id:new ObjectId(id)}
      const option={upsert:true}
      const updateProduct={
        $set:{
          img:product.img,
          name:product.name,
          price:product.price,
          rating:product.rating,
        }
      }
      const result=await volunteerCollection.updateOne(filter,updateProduct,option);
      res.send(result);
    })

    app.get('/volunteers',async(req,res)=>{
        const cursor=volunteerCollection.find();
        const result=await cursor.toArray();
        res.send(result);
    })




    const DiscountToys=client.db('discountToysDB').collection('discountToys');
    app.post('/discount',async(req,res)=>{
      const volunteer=req.body;
      const result=await DiscountToys.insertOne(volunteer);
      res.send(result);
    })

    app.get('/discount',async(req,res)=>{
      const cursor=DiscountToys.find();
      const result=await cursor.toArray();
      res.send(result);
  })

  
  const newProduct=client.db('NewProductToysDB').collection('NewProductToys');
  app.post('/newProduct',async(req,res)=>{
    const volunteer=req.body;
    const result=await newProduct.insertOne(volunteer);
    res.send(result);
  })
  app.get('/newProduct',async(req,res)=>{
    const cursor=newProduct.find();
    const result=await cursor.toArray();
    res.send(result);
})



  const tabToys=client.db('tabToysDB').collection('tabToys');
  app.post('/tabToys',async(req,res)=>{
    const volunteer=req.body;
    const result=await tabToys.insertOne(volunteer);
    res.send(result);
  })  

  app.get('/tabToys',async(req,res)=>{
    const specificProduct=tabToys.find();
    const result=await specificProduct.toArray();
    res.send(result);
    ;})


    const addAToys=client.db('AddAToysDB').collection('AddAToys');

    app.post('/addAToys',async(req,res)=>{
      const addToys=req.body;
      const result=await addAToys.insertOne(addToys);
      res.send(result);
    })

    app.get('/addAToys',async(req,res)=>{
      const addToys=addAToys.find();
      const result=await addToys.toArray();
      res.send(result);
      ;})

      app.get('/addAToys/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id: new ObjectId(id)};
        const cursor=addAToys.find(query);
        const result=await cursor.toArray();
        res.send(result);
      })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('server is running');
})

app.listen(port,()=>{
    console.log(`the server port number is running ${port}`);
})