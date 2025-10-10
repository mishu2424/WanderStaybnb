require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { DateTime } = require("luxon");
const port = process.env.PORT || 8000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionsSuccessStatus: 200,
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

const sendEmail = async (emailAddress, emailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.TRANSPORT_EMAIL,
      pass: process.env.TRANSPORT_PASS,
    },
  });

  // Promise style (Node.js 8+)
  try {
    await transporter.verify();
    // console.log("Server is ready to take our messages");

    const mailBody = {
      from: `"WanderStay" <${process.env.TRANSPORT_EMAIL}>`,
      to: emailAddress,
      subject: emailData.subject,
      html: emailData.message,
    };
    const info = await transporter.sendMail(mailBody);
    // console.log("Email has been sent", info.response);
  } catch (err) {
    console.error("Email verification failed", err);
  }
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
    const bookingHistoryCollection = client
      .db("WanderStay_db")
      .collection("booking_history");
    const reviewCollection = client.db("WanderStay_db").collection("reviews");
    const roomReviewCollection = client
      .db("WanderStay_db")
      .collection("room_reviews");
    const bookMarksCollection = client
      .db("WanderStay_db")
      .collection("bookmarks");
    const cancelledBookingCollection = client
      .db("WanderStay_db")
      .collection("cancelled_bookings");
    const blockedUsersCollections = client
      .db("WanderStay_db")
      .collection("blocked_users");

    // bookingCollection.updateMany({ to: { $type: "string" } }, [
    //   { $set: { to: { $toDate: "$to" }, from: { $toDate: "$from" } } },
    // ]);

    // roomsCollection.updateMany({ to: { $type: "string" } }, [
    //   { $set: { to: { $toDate: "$to" }, from: { $toDate: "$from" } } },
    // ]);
    // One-off job that processes all bookings whose `to` is "today" in America/Toronto
    const runCheckoutJob = async () => {
      try {
        // console.log("[cron] Running booking check…");

        const startUTC = DateTime.utc().startOf("day").toJSDate();
        const endUTC = DateTime.utc().endOf("day").toJSDate();
        const bookingsEndingToday = await bookingCollection
          .find({
            to: { $gte: startUTC, $lt: endUTC },
          })
          .toArray();

        // console.log(
        //   `[cron] Found ${bookingsEndingToday.length} bookings ending today`
        // );

        for (const booking of bookingsEndingToday) {
          // notify guest
          if (booking?.guest?.email) {
            // inside your loop
            const reviewUrl = `${process.env.FRONTEND_URL}/room/${
              booking.roomId
            }?review=${true}`;
            await sendEmail(booking.guest.email, {
              subject: "Your booking ends today",
              message: `<p>Hi ${booking?.guest?.name || "there"},</p>
    <p>Your stay at <strong>${
      booking?.title
    }</strong> ends today. Thank you for booking with WanderStay.</p>
    <p><a href="${reviewUrl}" target="_blank" rel="noopener noreferrer">
      Click here to rate your stay ★★★★★
    </a></p>`,
            });
          }

          // notify host
          if (booking?.host?.email) {
            await sendEmail(booking.host.email, {
              subject: "Your room is available again",
              message: `Hi ${booking?.host?.name || "Host"}, your room "${
                booking?.title
              }" is now free for new reservations.`,
            });
          }

          // update room status (mark as available)
          if (booking?.roomId) {
            await roomsCollection.updateOne(
              { _id: new ObjectId(booking.roomId) },
              { $set: { booked: false } }
            );
          }

          const bookingHistoryInfo = {
            ...booking,
            timeStamp: Date.now(),
          };

          // archive to history then remove active booking (prevents duplicate emails)
          const bookingHistoryData = await bookingHistoryCollection.insertOne(
            bookingHistoryInfo
          );
          const deletedBooking = await bookingCollection.deleteOne({
            _id: booking._id,
          });
        }
      } catch (err) {
        console.error("[cron] Job error:", err);
      }
    };

    // // Schedule it once at startup — midnight in America/Toronto, every day
    cron.schedule("0 0 * * *", runCheckoutJob, { timezone: "UTC" });

    // // Optional: manual trigger for testing
    app.get("/cron/checkout", async (req, res) => {
      await runCheckoutJob();
      res.json({ ok: true });
    });
    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      // put them in blocked list
      const blockedAccounts = await blockedUsersCollections.findOne({
        blocked_email: user?.email,
      });
      if (blockedAccounts) {
        // console.log("entered");
        return res
          .status(403)
          .send({ success: false, message: "User is blocked." });
      }
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

    const verifyAdmin = async (req, res, next) => {
      const user = req?.user;
      const query = { email: user?.email };
      const result = await usersCollection.findOne(query);
      if (!result || result.role !== "admin")
        return res.status(403).send({ message: "forbidden access" });
      next();
    };

    const verifyHost = async (req, res, next) => {
      const user = req?.user;
      const query = { email: user?.email };
      const result = await usersCollection.findOne(query);
      // console.log("came this far");
      // console.log(result);
      if (!result || result.role !== "host")
        return res.status(403).send({ message: "forbidden access" });
      next();
    };

    const verifyAdminOrHost = async (req, res, next) => {
      // console.log("came this far 6");
      const user = req?.user;
      const query = { email: user?.email };
      const result = await usersCollection.findOne(query);
      if (!result || result.role === "guest")
        return res.status(403).send({ message: "forbidden access" });
      next();
    };

    app.get("/rooms", async (req, res) => {
      const popular = req?.query?.popular;
      // console.log(popular);
      if (popular) {
        const popularRooms = await roomsCollection.find({ popular }).toArray();
        return res.send(popularRooms);
      }
      const page = parseInt(req?.query?.page) || 1;
      const limit = parseInt(req?.query?.limit) || 10;
      const skip = (page - 1) * limit;
      const categoryName = req?.query?.category;
      const search = req?.query?.search;
      const sort = req?.query?.sort;

      // console.log('searchtext',search);

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

    app.post("/rooms", verifyToken, verifyHost, async (req, res) => {
      const room = req?.body;
      const from = new Date(room.from);
      const to = new Date(room.to);

      const roomData = {
        ...room,
        from,
        to,
      };
      const result = await roomsCollection.insertOne(roomData);
      sendEmail(room?.host?.email, {
        subject: "Your room has been posted",
        message: "Congratulations! You have successfully posted your room",
      });
      res.send(result);
    });

    app.patch(`/update-room/:id`, verifyToken, verifyHost, async (req, res) => {
      const id = req?.params?.id;
      const room = req?.body;
      // console.log("id", id, "room", room);
      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...room,
          roomUpdatedTimeStamp: Date.now(),
        },
      };
      const result = await roomsCollection.updateOne(query, updatedDoc);
      sendEmail(room?.host?.email, {
        subject: "Your room has been updated",
        message: "Congratulations! You have successfully updated your room",
      });

      const { booked } = await roomsCollection.findOne(query, {
        projection: {
          booked: 1,
        },
      });

      // console.log('roombooked',booked);
      if (booked) {
        const { guest, title } = await bookingCollection.findOne(
          { roomId: id },
          {
            title: 1,
            guest: 1,
          }
        );
        const reviewUrl = `${process.env.FRONTEND_URL}/room/${id}`;
        await sendEmail(guest?.email, {
          subject: "Update!!!",
          message: `<p>Hi ${guest?.name || "there"},</p>
    <p>Your room <strong>${title}</strong> has been updated. Check out the changes.</p>
    <p><a href="${reviewUrl}" target="_blank" rel="noopener noreferrer">
      Click here to see
    </a></p>`,
        });
      }
      res.send(result);
    });

    app.delete(
      `/room-delete/:id`,
      verifyToken,
      verifyAdminOrHost,
      async (req, res) => {
        // console.log("coming this far");
        const { email } = req?.user;
        const { reason } = req?.query;
        // console.log(reason);
        const id = req?.params?.id;
        // console.log(id);

        const { booked } = await roomsCollection.findOne(
          { _id: new ObjectId(id) },
          {
            projection: {
              booked: 1,
            },
          }
        );

        // console.log('roombooked',booked);
        if (booked) {
          const now = new Date();
          const cutoff = new Date(now.getTime() + 48 * 60 * 60 * 1000); // +48h

          // Try Date-based query first (correct type).
          // If your `from/to` are strings, use the string fallback below.
          let blockingBooking = await bookingCollection.findOne({
            roomId: id,
            to: { $gte: now }, // hasn't fully ended yet
            from: { $lte: cutoff }, // already started or starts within next 48h
          });

          // Fallback for when `from/to` are ISO **strings** in your DB
          if (!blockingBooking) {
            const nowISO = now.toISOString();
            const cutoffISO = cutoff.toISOString();
            blockingBooking = await bookingCollection.findOne({
              roomId: id,
              to: { $gte: nowISO },
              from: { $lte: cutoffISO },
            });
          }

          if (blockingBooking) {
            return res.status(409).send({
              message:
                "Cannot delete: room has a booking that is active or starts within 48 hours.",
            });
          }

          const bookingDetails = await bookingCollection.findOne({
            roomId: id,
          });
          // console.log(bookingDetails);

          await sendEmail(bookingDetails?.guest?.email, {
            subject: "Update!!!",
            message: `<p>Hi ${bookingDetails?.guest?.name || "there"},</p>
    <p>Your room <strong>${
      bookingDetails?.title
    }</strong> has been deleted. You have been refunded!</p>`,
          });
          const cancelledBookingInfo = {
            ...bookingDetails,
            reason,
          };
          await cancelledBookingCollection.insertOne(cancelledBookingInfo);
          await bookingCollection.deleteOne({ _id: bookingDetails._id });
          const result = await roomsCollection.deleteOne({
            _id: new ObjectId(id),
          });
          return res.send(result);
        }

        const room = await roomsCollection.findOne({ _id: new ObjectId(id) });
        const result = await roomsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        // console.log(room);
        sendEmail(room?.host?.email, {
          subject: "Deleted",
          message: "Your room has successfully been deleted",
        });
        res.send(result);
      }
    );
    // users
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req?.params?.email;
      // console.log('role',email);

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
          sendEmail(user?.email, {
            subject: "Update!!!",
            message: "Your request has been sent! Wait for the admin approval!",
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

      sendEmail(user?.email, {
        subject: "Welcome",
        message: `Hello ${user?.name}. Welcome to our WanderStay Site.`,
      });

      return res.send(result);
    });

    app.patch(
      `/update-user-role/:email`,
      verifyToken,
      verifyHost,
      async (req, res) => {
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

        if (updatedUser?.role === "admin") {
          sendEmail(email, {
            subject: "Congratulations!",
            message: `You have become an ${updatedUser?.role}!`,
          });
        }

        if (updatedUser?.role === "host") {
          sendEmail(email, {
            subject: "Congratulations!",
            message: `You have become a ${updatedUser?.role}!`,
          });
        }
        res.send(result);
      }
    );

    // block user information

    app.get("/block-user/:email", async (req, res) => {
      const email = req?.params?.email;
      const query = { blocked_email: email };
      const blockedUser = await blockedUsersCollections.findOne(query);
      // console.log(query, blockedUser);
      res.send(blockedUser);
    });

    app.delete(
      "/block-user/:email",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const email = req?.params?.email;

        const blockedAccounts = await blockedUsersCollections.findOne({
          blocked_email: email,
        });
        if (blockedAccounts) {
          return res
            .status(403)
            .send({ success: false, message: "User is already blocked." });
        }
        const query = { email };
        const result = await usersCollection.deleteOne(query);
        res.send(result);
      }
    );

    // payments
    app.post("/create-payment-intent", async (req, res) => {
      const price = req?.body?.total;
      // console.log('price',price);
      //stripe accepts price in cents which is why converted it into cents by multiplying it with 100;
      const priceInCent = parseFloat(price) * 100;
      if (!price || priceInCent < 1) return;

      // generate a client secret key

      // console.log(priceInCent);
      const { client_secret } = await stripe.paymentIntents.create({
        amount: priceInCent,
        currency: "cad",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // send it to client
      res.send({ clientSecret: client_secret });
    });

    // booking
    app.get(`/bookings/:email`, verifyToken, async (req, res) => {
      const email = req?.params?.email;
      const query = { "guest.email": email };
      // console.log("quer", query);
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    app.get(
      `/manage-bookings/:email`,
      verifyToken,
      verifyHost,
      async (req, res) => {
        const email = req?.params?.email;
        const query = { "host.email": email };
        // console.log("query", query);
        const result = await bookingCollection.find(query).toArray();
        // console.log(result);
        res.send(result);
      }
    );

    app.post("/booking", verifyToken, async (req, res) => {
      const booking = req?.body;
      console.log(booking);
      const result = await bookingCollection.insertOne(booking);
      sendEmail(booking?.guest?.email, {
        subject: "Congratulations!",
        message: `You have successfully booked the room ${booking?.guest?.name}!Transaction id:${booking?.transactionId}`,
      });
      res.send(result);
    });

    app.patch("/update-room-status/:id", verifyToken, async (req, res) => {
      const id = req?.params?.id;
      const { status } = req?.body;

      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          booked: status,
        },
      };
      const result = await roomsCollection.updateOne(query, updatedDoc);

      const { host } = await roomsCollection.findOne(
        {
          _id: new ObjectId(id),
        },
        {
          projection: {
            host: 1,
          },
        }
      );
      // console.log('id from status', id);
      const bookingInfo = await bookingCollection.findOne({ roomId: id });

      // console.log(host,bookingInfo);

      sendEmail(host?.email, {
        subject: "Congratulations!",
        message: `Your room has successfully been booked!!! Welcome your guest ${bookingInfo?.guest?.email}`,
      });

      res.send(result);
    });

    app.delete("/bookings/:id", verifyToken, async (req, res) => {
      const id = req?.params?.id;
      const query = { _id: new ObjectId(id) };
      // console.log(id,'hit');
      const reason = req?.query?.reason;
      // console.log("query", req?.query);

      const bookingData = await bookingCollection.findOne(query);
      // console.log(bookingData);

      const cancelledBookingData = {
        ...bookingData,
        reason,
        timeStamp: Date.now(),
      };
      const cancelledBookingInfo = await cancelledBookingCollection.insertOne(
        cancelledBookingData
      );
      // console.log(cancelledBookingData, cancelledBookingInfo);
      const result = await bookingCollection.deleteOne(query);

      // console.log(bookingData?.guest?.email);
      sendEmail(bookingData?.guest?.email, {
        subject: "Cancelled!",
        message: `Your room booking has been canceled!`,
      });
      sendEmail(bookingData?.host?.email, {
        subject: "Cancelled!",
        message: `Your reservation has been canceled!`,
      });
      res.send(result);
    });

    // my-listings
    app.get(`/listings/:email`, verifyToken, verifyHost, async (req, res) => {
      const email = req?.params?.email;
      const query = { "host.email": email };
      // console.log(query);
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
        // console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // bookmarks
    app.get(`/bookmarks/:email/:roomId`, verifyToken, async (req, res) => {
      const email = req?.params?.email;
      const roomId = req?.params?.roomId;
      // console.log(email, roomId);
      const query = { "guest.email": email, roomId: roomId };
      const result = await bookMarksCollection.findOne(query);
      // console.log(result);
      res.send(result);
    });

    app.post("/bookmarks", async (req, res) => {
      const bookmarkedRoom = req?.body;
      const result = await bookMarksCollection.insertOne(bookmarkedRoom);
      res.send(result);
    });

    app.delete("/bookmarks/:id", async (req, res) => {
      const { id } = req?.params;
      const query = { roomId: id };
      const result = await bookMarksCollection.deleteOne(query);
      res.send(result);
    });

    // stats
    // guest-stats
    app.get("/guest-stats", verifyToken, async (req, res) => {
      const { email } = req?.user;
      const bookings = await bookingCollection
        .find(
          { "guest.email": email },
          {
            projection: {
              date: 1,
              price: 1,
            },
          }
        )
        .toArray();

      const { timeStamp } = await usersCollection.findOne(
        { email },
        {
          projection: {
            timeStamp: 1,
          },
        }
      );

      const chartData = bookings?.map((booking) => {
        const day = new Date(booking?.date).getDate();
        const month = new Date(booking?.date).getMonth() + 1;
        const data = [`${day}/${month}`, Number(booking?.price)];
        return data;
      });

      chartData.unshift(["Day", "Sales"]);

      const totalSales = bookings.reduce(
        (sum, booking) => sum + Number(booking?.price),
        0
      );

      res.send({
        totalBookings: bookings?.length,
        timeStamp,
        totalSales,
        chartData,
      });
    });

    // host-stats
    app.get("/host-stats", verifyToken, async (req, res) => {
      const { email } = req?.user;
      const bookings = await bookingCollection
        .find(
          { "host.email": email },
          {
            projection: {
              date: 1,
              price: 1,
            },
          }
        )
        .toArray();

      const totalRooms = await roomsCollection.countDocuments({
        "host.email": email,
      });

      const { timeStamp } = await usersCollection.findOne(
        { email },
        {
          projection: {
            timeStamp: 1,
          },
        }
      );

      const totalSales = bookings.reduce(
        (sum, booking) => sum + Number(booking?.price),
        0
      );

      const chartData = bookings.map((booking) => {
        const day = new Date(booking?.date).getDate();
        const month = new Date(booking?.date).getMonth() + 1;
        const data = [`${day}/${month}`, Number(booking?.price)];
        return data;
      });

      res.send({
        totalBookings: bookings.length,
        totalSales,
        totalRooms,
        timeStamp,
        chartData,
      });
    });

    // admin-stats
    app.get("/admin-stats", verifyToken, async (req, res) => {
      const { email } = req?.user;
      const bookings = await bookingCollection
        .find({
          projection: {
            date: 1,
            price: 1,
          },
        })
        .toArray();
      const totalRooms = await roomsCollection.countDocuments();

      const { timeStamp } = await usersCollection.findOne(
        { email },
        {
          projection: {
            timeStamp: 1,
          },
        }
      );

      const totalUsers = await usersCollection.countDocuments();

      const totalSales = bookings.reduce(
        (sum, booking) => sum + Number(booking?.price),
        0
      );

      const chartData = bookings.map((booking) => {
        const day = new Date(booking?.date).getDate();
        const month = new Date(booking?.date).getMonth() + 1;
        const data = [`${day}/${month}`, Number(booking?.price)];
        return data;
      });

      res.send({
        totalBookings: bookings.length,
        totalSales,
        totalRooms,
        timeStamp,
        totalUsers,
        chartData,
      });
    });

    // reviews
    // website-review
    app.get(`/all-reviews`, async (req, res) => {
      const result = await reviewCollection.find({}).toArray();
      res.send(result);
    });

    app.post(`/all-review`, async (req, res) => {
      const reviewData = req?.body;
      const result = await reviewCollection.insertOne(reviewData);
      res.send(result);
    });

    // room-review
    app.get(`/room-review/:roomId`, async (req, res) => {
      const { roomId } = req?.params;
      const result = await roomReviewCollection.find({ roomId }).toArray();
      // console.log(result);
      res.send(result);
    });

    app.post("/room-review", async (req, res) => {
      const roomReview = req?.body;
      const { roomId } = roomReview;
      const result = await roomReviewCollection.insertOne(roomReview);
      const [agg] = await roomReviewCollection
        .aggregate([
          { $match: { roomId } },
          {
            $group: { _id: null, count: { $sum: 1 }, avg: { $avg: "$rating" } },
          },
        ])
        .toArray();

      // console.log(agg);

      await roomsCollection.updateOne(
        { _id: new ObjectId(roomId) },
        {
          $set: {
            "rating.score": Number(agg?.avg?.toFixed(1)) || 0,
            "rating.count": agg?.count || 0,
          },
        }
      );
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from WanderStay Server..");
});

app.listen(port, () => {
  // console.log(`WanderStay is running on port ${port}`);
});
