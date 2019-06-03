import { NextFunction, Request, Response } from "express-serve-static-core";
import { check } from "express-validator/check";
import validation from "../../utils/Validator";
import GetPostsByCreatorId from "../../use_cases/PostByCreatorId";

const test = [
  check("creatorId")
    .exists()
    .isUUID(),
  validation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId = req.params.creatorId;
      const result = await GetPostsByCreatorId.getPostsByCreatorId(creatorId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
];

export default test;
