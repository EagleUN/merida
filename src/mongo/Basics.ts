import MongoDb, { MongoClient } from "mongodb";
import Config from "../utils/Config";
import Logger from "../utils/Logger";

export const log = Logger("Mongo Gateway");

export const clientPromise = MongoDb.connect(Config.get("MONGO_DB_URL"), {
  useNewUrlParser: true,
});

let client: MongoClient;

export const closeClient = async () => {
  if (!client) {
    client = await clientPromise;
  }
  await client.close();
};
