import express, { Router } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import config from "./config";
import routers from "./routers";
import database from "./api/database";
import MathRouter from "./routers/handleCodeMath";


if (!config.mongoURI) throw new Error("unknow URI");
const client = new MongoClient(config.mongoURI);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routers);
app.use("/", MathRouter);

app.listen(config.port, () => {
    console.log(`Server is running PORT: ${config.port}`);
})