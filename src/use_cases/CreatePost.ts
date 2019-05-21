import postsQueries from "../queries/Posts";

const createPost = async(payload: any): Promise<string> => {
  const result = await postsQueries.insertJob(payload);
  return result;
};

export default {
  createPost,
};
