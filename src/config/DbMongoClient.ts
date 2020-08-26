import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

class DbMongoClient {
  connect() {
    mongoose
      .connect(`${process.env.DB_MONGO}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Mongodb connected");
      })
      .catch((err) => console.error(err.message));
  }
}

export default new DbMongoClient();
