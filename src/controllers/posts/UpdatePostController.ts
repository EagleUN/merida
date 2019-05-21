import { NextFunction, Request, Response } from "express-serve-static-core";
import { body, check } from "express-validator/check";
import validation from "../../utils/Validator";
import UpdatePost from "../../use_cases/UpdatePost";

const test = [
  check("id")
    .exists()
    .isUUID(),
  body("newContent")
    .exists()
    .isString(),
  validation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const newContent = req.body.newContent;
      const result = await UpdatePost.updatePost(postId, newContent);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
];

export default test;
