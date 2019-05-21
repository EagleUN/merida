import postsQueries from "../queries/Posts";

const updatePost = async(postId: string, newContent: string): Promise<any> => {
  const post = await postsQueries.updatePost(postId, newContent);
  return post;
}

export default {
  updatePost,
};
