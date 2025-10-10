import { MongoClient, ObjectId } from "mongodb";
// import nodemailer or an email API here (email APIs are more reliable on serverless)

let cachedClient;
async function getClient() {
  if (cachedClient) return cachedClient;
  cachedClient = new MongoClient(process.env.MONGODB_URI);
  await cachedClient.connect();
  return cachedClient;
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const client = await getClient();
    const db = client.db("WanderStay_db");
    const bookingCollection = db.collection("bookings");
    const roomsCollection = db.collection("rooms");
    const bookingHistoryCollection = db.collection("booking_history");

    // Compute “today in Toronto”, then query using UTC bounds
    const tz = "America/Toronto";
    const now = new Date();

    const startLocal = new Date(
      now.toLocaleString("en-US", { timeZone: tz }).replace(/,.*$/, "")
    );
    startLocal.setHours(0,0,0,0);
    const endLocal = new Date(startLocal);
    endLocal.setHours(23,59,59,999);

    const startUTC = new Date(startLocal.toLocaleString("en-US", { timeZone: "UTC" }));
    const endUTC   = new Date(endLocal.toLocaleString("en-US", { timeZone: "UTC" }));

    const bookings = await bookingCollection.find({
      to: { $gte: startUTC, $lt: endUTC },
      emailedOnCheckout: { $ne: true },
    }).toArray();

    for (const b of bookings) {
      // await sendEmail(b.guest.email, {...});
      // await sendEmail(b.host.email, {...});
      if (b?.roomId) {
        await roomsCollection.updateOne(
          { _id: new ObjectId(b.roomId) },
          { $set: { booked: false } }
        );
      }
      await bookingHistoryCollection.insertOne(b);
      await bookingCollection.updateOne(
        { _id: b._id },
        { $set: { emailedOnCheckout: true } }
      );
    }

    return res.status(200).json({ ok: true, processed: bookings.length });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false });
  }
}
