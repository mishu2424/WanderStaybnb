const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 8000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xkl5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const roomsCollection = client.db("WanderStay_db").collection("rooms");
    const usersCollection = client.db("WanderStay_db").collection("users");
    const bookingCollection = client.db("WanderStay_db").collection("bookings");
    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    app.get("/rooms", async (req, res) => {
      const page = parseInt(req?.query?.page) || 1;
      const limit = parseInt(req?.query?.limit) || 10;
      const skip = (page - 1) * limit;
      const categoryName = req?.query?.category;
      const search = req?.query?.search;
      const sort = req?.query?.sort;

      let query = {};

      if (search) {
        query = {
          $or: [
            { location: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
          ],
        };
      }

      let options = {};
      if (sort === "asc-p") {
        options = { price: "-1" };
      } else if (sort === "desc-p") {
        options = { price: "1" };
      } else if (sort === "asc-r") {
        options = { "rating.score": "-1" };
      } else if (sort === "desc-r") {
        options = { "rating.score": "1" };
      }

      if (categoryName) {
        query = { ...query, category: categoryName };
      }

      const result = await roomsCollection
        .find(query)
        .sort(options)
        .skip(skip)
        .limit(limit)
        .toArray();
      res.send(result);
    });

    app.get("/rooms-count", async (req, res) => {
      const categoryName = req?.query?.category;
      const search = req?.query?.search;
      let query = {};
      if (search) {
        query = {
          $or: [
            { location: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
          ],
        };
      }

      if (categoryName) {
        query = { ...query, category: categoryName };
      }

      const count = await roomsCollection.countDocuments(query);
      res.send({ count });
    });

    app.get("/room/:id", async (req, res) => {
      const id = req.params.id;
      const result = await roomsCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post("/rooms", async (req, res) => {
      const room = req?.body;
      const result = await roomsCollection.insertOne(room);
      res.send(result);
    });

    app.patch(`/update-room/:id`,async(req,res)=>{
      const id=req?.params?.id;
      const room=req?.body;
      console.log('id',id,'room',room);
      const query={_id:new ObjectId(id)};
      const updatedDoc={
        $set:{
          ...room,
          roomUpdatedTimeStamp:Date.now(),
        }
      }
      const result=await roomsCollection.updateOne(query,updatedDoc);
      res.send(result);
    })

    app.delete(`/room-delete/:id`, async(req,res)=>{
      const id=req?.params?.id;
      console.log(id);
      const result=await roomsCollection.deleteOne({_id:new ObjectId(id)});
      res.send(result);
    })
    // users
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req?.params?.email;

      const result = await usersCollection.findOne({ email });
      res.send(result);
    });

    app.put("/users", async (req, res) => {
      const user = req?.body;
      // console.log(user);

      const query = { email: user?.email };
      const options = { upsert: true };
      const userFound = await usersCollection.findOne(query);
      if (userFound) {
        if (user?.status === "Requested") {
          const updatedUser = await usersCollection.updateOne(query, {
            $set: { status: user?.status },
          });
          return res.send(updatedUser);
        } else {
          return res.send(userFound);
        }
      }

      const updatedDoc = {
        $set: {
          ...user,
          timeStamp: Date.now(),
        },
      };

      const result = await usersCollection.updateOne(
        query,
        updatedDoc,
        options
      );

      return res.send(result);
    });

    app.patch(`/update-user-role/:email`, async (req, res) => {
      const email = req?.params?.email;

      const updatedUser = req?.body;
      const updatedDoc = {
        $set: {
          role: updatedUser?.role,
          status: updatedUser?.status,
          timeStamp: Date.now(),
        },
      };

      const result = await usersCollection.updateOne({ email }, updatedDoc);
      res.send(result);
    });

    // booking
    app.get(`/bookings/:email`, async (req, res) => {
      const email = req?.params?.email;
      const query = { "guest.email": email };
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    app.get(`/manage-bookings/:email`, async (req, res) => {
      const email = req?.params?.email;
      const query = { "host.email": email };
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/booking", async (req, res) => {
      const booking = req?.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    app.patch("/update-room-status/:id", async (req, res) => {
      const id = req?.params?.id;
      const { status } = req?.body;

      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          booked: status,
        },
      };
      const result = await roomsCollection.updateOne(query, updatedDoc);
      res.send(result);
    });

    // my-listings
    app.get(`/listings/:email`, async (req, res) => {
      const email = req?.params?.email;
      const query = { "host.email": email };
      console.log(query);
      const result = await roomsCollection.find(query).toArray();
      res.send(result);
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from WanderStay Server..");
});

app.listen(port, () => {
  console.log(`WanderStay is running on port ${port}`);
});
