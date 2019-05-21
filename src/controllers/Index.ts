import express from "express";
import { NextFunction, Request, Response } from "express-serve-static-core";
import logger from "morgan";
import postsRouter from "../controllers/routes/Posts";

const router = express.Router();
const logFormat =
  ":date[iso] :remote-addr :remote-user :method :url " +
  "HTTP/:http-version :status :res[content-length] - :response-time ms \n";

const healthCheck = (_: any, res: Response) => {
  res.status(200).json({ status: "Merida is healthy" });
};

router.use(logger(logFormat));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use("/posts", postsRouter);

router.get("/", healthCheck);

router.use((_: Request, res: Response, __: NextFunction) => {
  res.status(404).json({
    error: "Not found",
  });
});

export default router;
