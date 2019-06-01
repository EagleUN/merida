import express from "express";
import createPostController from "../../controllers/posts/PostCreationController";
import getPostController from "../../controllers/posts/GetPostController";
import deletePostController from "../../controllers/posts/DeletePostController";
import updatePostController from "../../controllers/posts/UpdatePostController";

const router = express.Router();

router.post("/", createPostController);
router.get("/:id", getPostController);
router.delete("/:id", deletePostController);
router.put("/:id", updatePostController);

export default router;
