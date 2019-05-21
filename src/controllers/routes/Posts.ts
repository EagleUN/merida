import express from "express";
import createPostController from "../../controllers/posts/PostCreationController";
import getPostController from "../../controllers/posts/GetPostController";

const router = express.Router();

router.post("/", createPostController);
router.get("/find/:id", getPostController);
router.post("/delete/:id")
export default router;
