import mongoose from "mongoose";

const uri = process.env.MONGODB_URI ?? "";
console.log(uri);

const clientPromise = mongoose.connect(uri);

mongoose.connection.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

export = clientPromise;
