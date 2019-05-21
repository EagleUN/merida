import { clientPromise } from "../mongo/Basics";
import { v4 as uuid } from "uuid";

const POSTS_COLLECTION = "posts";

const insertJob = async(payload: any): Promise<string> => {
  const client = await clientPromise;
  const collection = client.db().collection(POSTS_COLLECTION);

  const postsPayload = createPostPayload(payload);
  await collection.insertOne(postsPayload);
  return postsPayload.id;
}

const createPostPayload = (payload: any): any => {
  return {
    id: uuid(),
    createdAt: new Date(),
    creatorId: payload.idCreator,
    content: payload.content,
  };
}

const getPostById = async($id: string): Promise<any> => {
  const client = await clientPromise;
  const collection = client.db().collection(POSTS_COLLECTION);

  const job = await collection.findOne({ id: $id });
  return job;
}

const deletePost = async($id: string): Promise<string> => {
  const client = await clientPromise;
  const collection = client.db().collection(POSTS_COLLECTION);

  await collection.findOneAndDelete({ id: $id });
  return $id;
}

export default {
  insertJob,
  getPostById,
  deletePost,
}
