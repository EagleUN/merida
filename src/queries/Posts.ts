import { clientPromise } from "../mongo/Basics";
import { v4 as uuid } from "uuid";

const POSTS_COLLECTION = "posts";

const insertPost = async(payload: any): Promise<string> => {
  const client = await clientPromise;
  const collection = client.db().collection(POSTS_COLLECTION);

  const postsPayload = createPostPayload(payload);
  await collection.insertOne(postsPayload);
  return postsPayload;
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
  
  const post = await collection.findOne({ id: $id });
  return post;
}

const deletePost = async($id: string): Promise<any> => {
  const client = await clientPromise;
  const collection = client.db().collection(POSTS_COLLECTION);

  const deletedPost = await collection.findOneAndDelete({ id: $id });
  return deletedPost.value;
}

const updatePost = async(postId: string, newContent: string): Promise<any> => {
  const client = await clientPromise;
  const collection = client.db().collection(POSTS_COLLECTION);

  const currentPost = await collection.findOne({ id: postId });
  const newPost = createPostPayload({ id: currentPost.id, idCreator: currentPost.idCreator, content: newContent });

  await collection.findOneAndReplace({ id: postId }, newPost);
  return newPost;
}

export default {
  insertPost,
  getPostById,
  deletePost,
  updatePost,
}
