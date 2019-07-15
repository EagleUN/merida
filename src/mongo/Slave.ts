import MongoDb, { MongoClient } from "mongodb";
import Config from "../utils/Config";
import Logger from "../utils/Logger";

export const log = Logger("Slave Mongo Gateway");

export const clientPromise = MongoDb.connect(Config.get("SLAVE_DB_URL"), {
  useNewUrlParser: true,
});

let client: MongoClient;

export const closeClient = async () => {
  if (!client) {
    client = await clientPromise;
  }
  await client.close();
};
