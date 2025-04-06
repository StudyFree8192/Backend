import { Router } from "express";
import auth from "./auth";
import database from "../api/database";
import problem from "./problem";

const router = Router();
router.use("/auth", auth);
router.use("/problem", problem);



export default router;