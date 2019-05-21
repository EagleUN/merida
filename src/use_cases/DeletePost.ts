import postsQueries from "../queries/Posts";

const deletePost = async(postId: string): Promise<string> => {
  const result = await postsQueries.deletePost(postId);
  return result;
};

export default {
  deletePost,
};
