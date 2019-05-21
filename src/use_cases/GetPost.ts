import postsQueries from "../queries/Posts";

const getPost = async(postId: string): Promise<any> => {
  const post = await postsQueries.getPostById(postId);
  return post;
}

export default {
  getPost,
};
