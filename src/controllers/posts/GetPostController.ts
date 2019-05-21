import { NextFunction, Request, Response } from "express-serve-static-core";
import { check } from "express-validator/check";
import validation from "../../utils/Validator";
import GetPost from "../../use_cases/GetPost";

const test = [
  check("id")
    .exists()
    .isUUID(),
  validation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const result = await GetPost.getPost(postId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
];

export default test;
