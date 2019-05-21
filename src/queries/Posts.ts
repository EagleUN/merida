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
    id: payload.id ? payload.id: uuid(),
    createdAt: new Date(),
    idCreator: payload.idCreator,
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

const updatePost = async(postId: string, newContent: string): Promise<string> => {
  const client = await clientPromise;
  const collection = client.db().collection(POSTS_COLLECTION);

  const currentPost = await collection.findOne({ id: postId });
  const newPost = createPostPayload({ id: currentPost.id, idCreator: currentPost.idCreator, content: newContent });

  await collection.findOneAndReplace({ id: postId }, newPost);
  return postId;
}

export default {
  insertJob,
  getPostById,
  deletePost,
  updatePost,
}
