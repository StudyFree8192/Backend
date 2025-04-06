import { Router } from "express";
import auth from "./auth";
import database from "../api/database";
import problems from "./problems";

const router = Router();
router.use("/auth", auth);
router.use("/problems", problems);


export default router;