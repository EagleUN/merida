import { NextFunction, Request, Response } from "express-serve-static-core";
import { check } from "express-validator/check";
import validation from "../../utils/Validator";
import Test from "../../use_cases/Test";

const test = [
  check("id")
  .exists()
  .isString(),
  validation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await Test.test(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
];

export default test;
