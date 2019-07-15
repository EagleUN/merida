import { clientPromise as masterPromise } from "../mongo/Master";
import { clientPromise as slavePromise } from "../mongo/Slave";
import { v4 as uuid } from "uuid";

const POSTS_COLLECTION = "posts";
const LOAD_COLLECTION = "lb";

const insertPost = async(payload: any): Promise<string> => {
  const client = await masterPromise;
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
  await insertFirstLoadBalancerRow();
  const db = await getDatabaseToWork();
  let client;
  if(db === "master"){
    client = await masterPromise;
  }else {
    client = await slavePromise;
  }  
  const collection = client.db().collection(POSTS_COLLECTION);
  
  const post = await collection.findOne({ id: $id });  
  await updateCount(db);
  return post;
}

const deletePost = async($id: string): Promise<any> => {
  const client = await masterPromise;
  const collection = client.db().collection(POSTS_COLLECTION);

  const deletedPost = await collection.findOneAndDelete({ id: $id });  
  return deletedPost.value;
}

const updatePost = async(postId: string, newContent: string): Promise<any> => {
  const client = await masterPromise;
  const collection = client.db().collection(POSTS_COLLECTION);

  const currentPost = await collection.findOne({ id: postId });
  const newPost = createPostPayload({ id: currentPost.id, idCreator: currentPost.idCreator, content: newContent });

  await collection.findOneAndReplace({ id: postId }, newPost);  
  return newPost;
}

const getPostsByCreatorId = async(creatorId: string): Promise<any> => {
  await insertFirstLoadBalancerRow();
  const db = await getDatabaseToWork();
  let client;
  if(db === "master"){
    client = await masterPromise;
  }else {
    client = await slavePromise;
  }  
  const collection = client.db().collection(POSTS_COLLECTION);

  const result = await collection.find({ idCreator: creatorId });
  const posts = await result.toArray();
  await updateCount(db);
  return posts;
}

export const getDatabaseToWork = async(): Promise<string> => {
  await insertFirstLoadBalancerRow();

  const client = await masterPromise;
  const collection = client.db().collection(LOAD_COLLECTION);
  const actual = await collection.findOne({valid: true});
  if(actual.master <= actual.slave){
    return "master";
  }
  return "slave";
}

const insertFirstLoadBalancerRow = async() => {
  const client = await masterPromise;
  const collection = client.db().collection(LOAD_COLLECTION);
  const result = await collection.find({ valid: true });
  const resultArray = await result.toArray();
  if(resultArray.length === 0){
    const row = {
      valid: true,
      master: 0,
      slave: 0
    };
    await collection.insertOne(row);
  }
}

const updateCount = async(db: string) => {
  const client = await masterPromise;
  const collection = client.db().collection(LOAD_COLLECTION);  
  const actual = await collection.findOne({valid: true});  
  let countReplacement: number;
  let objectToReplace;
  if(db === "master"){
    countReplacement = actual.master;
    countReplacement = countReplacement + 1;
    objectToReplace = {
      valid: true,
      master: countReplacement,
      slave: actual.slave
    };
  } else {
    countReplacement = actual.slave;
    countReplacement = countReplacement + 1;
    objectToReplace = {
      valid: true,
      master: actual.master,
      slave: countReplacement
    };    
  }
  await collection.findOneAndReplace({valid: true}, objectToReplace);
}

export default {
  insertPost,
  getPostById,
  deletePost,
  updatePost,
  getPostsByCreatorId
}
