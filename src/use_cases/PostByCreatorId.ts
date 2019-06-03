import postsQueries from "../queries/Posts";

const getPostsByCreatorId = async(creatorId: string): Promise<any> => {
  const post = await postsQueries.getPostsByCreatorId(creatorId);
  return post;
}

export default {
  getPostsByCreatorId,
};
