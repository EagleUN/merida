import { NextFunction, Request, Response } from "express-serve-static-core";
import { body } from "express-validator/check";
import validation from "../../utils/Validator";
import CreatePost from "../../use_cases/CreatePost";

const test = [
  body("idCreator")
    .exists()
    .isUUID(),
  body("content")
    .exists()
    .isString(),
  validation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const result = await CreatePost.createPost(payload);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
];

export default test;
