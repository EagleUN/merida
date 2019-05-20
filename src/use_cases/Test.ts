import { clientPromise } from "../mongo/Basics";

const test = async(id: string): Promise<any> => {
  const client = await clientPromise;  
  const TEST_COLLECTION = "test";
  const collection = client.db().collection(TEST_COLLECTION);
  await collection.insertOne({idAux: id});
  return id;
};

export default {
  test,
};
