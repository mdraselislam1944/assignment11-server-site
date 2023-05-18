const express=require('express');
const cors=require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app=express();
const port=process.env.PORT||5000;
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://toyBabyDB:5Jsl1Hn473KynBtc@cluster11.cpm08j1.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect();

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

    app.get('/volunteers/',async(req,res)=>{
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