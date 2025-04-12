import { Router } from "express";
import auth from "./auth";
import problems from "./problems";

const router = Router();
router.use("/auth", auth);
router.use("/problems", problems);

export default router;