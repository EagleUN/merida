import express from "express";
import testController from "../test/TestController";

const router = express.Router();

router.get("/prueba/:id", testController);

export default router;
