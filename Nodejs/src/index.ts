import express, { Router } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import config from "./config";
import routers from "./routers";
import database from "./api/database";

if (!config.mongoURI) throw new Error("unknow URI");
const client = new MongoClient(config.mongoURI);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routers);

// database.MultipleChoiceProblemCollection.insertOne({
//     name : "Giới từ",
//     idProblem : "P1",
//     Type : 1,
//     subject : "english",
//     Question : "You will be sorry ___ this later",
//     Options : ["about","through","away","across"],
//     answer : [1]
// });

// database.MultipleChoiceProblemCollection.insertOne({
//     idProblem : "P2",
//     name : "Đúng sai giới từ",
//     Type : 2,
//     subject : "english",
//     Question : "You will be sorry ___ this later",
//     Options : ["about","through","away","across"],
//     answer : [1,0,0,0]
// });

// database.ShortAnswerCollection.insertOne({
//     name : "Trả lời ngắn giới từ",
//     idProblem : "P3",
//     Type : 3,
//     subject : "english",
//     Question : "You will be sorry ___ this later",
//     answer : "About"
// });

// database.CodingproblemCollection.insertOne({
//     name : "Tổng 2 số",
//     Type : 4,
//     idProblem : "P4",
//     subject : "information technology",
//     Question : {
//         topic : "Cho 2 số nguyên A và B. Hãy tính tổng A + B",
//         input : "Gồm 1 dòng chứa 2 số nguyên A và B (1 <= A, B <= 1000), cách bởi 1 dấu cách.",
//         output : "Ghi ra tổng A + B",
//         example : [["1 1","2"],["3 4","7"]]
//     },
//     testcase : [["1 1","2"],["2 3","5"]]
// });

app.listen(config.port, () => {
    console.log(`Server is running PORT: ${config.port}`);
})



// const QuestionsList : Question[] = [
//     {
//         type : 1,
//         question : "What is your favorit food?",
//         options : ["Chicken","Beff stack","Pizza","Potato"]
//     },

//     {
//         type : 2,
//         question : "What is your favorit food?",
//         options : ["Chicken","Beff stack","Pizza","Potato"]
//     },

//     {
//         type : 3,
//         question : "What is your favorit food?"
//     }
// ]