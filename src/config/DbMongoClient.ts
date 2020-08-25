import mongoose from "mongoose";

class DbMongoClient {
  connect() {
    mongoose
      .connect(
        "mongodb+srv//admin:rDdYm3N2I8ahmShO@cluster0-ilnqk.gcp.mongodb.net/db_test",
        {
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("Mongo DataBase connected");
      })
      .catch((err) => console.error(err.message));
  }
}

export default new DbMongoClient();
