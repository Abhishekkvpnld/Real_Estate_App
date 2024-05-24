import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { savePost } from "../controllers/user.controller.js";


const router = express.Router();

router.get('/', getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save",verifyToken,savePost);

export default router;