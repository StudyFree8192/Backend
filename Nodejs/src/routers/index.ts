import { Router } from "express";
import auth from "./auth";
import database from "../api/database";
import problem from "./problem";
import contest from "./contest";

const router = Router();
router.use("/auth", auth);
router.use("/problem", problem);
router.use("/contest", contest);


export default router;