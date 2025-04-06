import express, { Router } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import config from "./config";
import routers from "./routers";
import database from "./api/database";


// Gọi database này 1 lần để thêm data vào mongodb để test em nhé
function TestDatabase() {
    database.ContestCollection.insertOne({
        Type : 1,
        nameContest : "Giới từ",
        subject : "English",
        IdProblems : [
            "67f1193306a0ca050e9e2f4b",
            "67f1eb0cf3bb20ddd96efc2d",
            "67f1eb0cf3bb20ddd96efc2e",
            "67f1eb0cf3bb20ddd96efc2f",
            "67f1eb0cf3bb20ddd96efc30"
        ]
    })
    
    database.MultipleChoiceProblemCollection.insertOne({
        name : "Giới từ",
        idProblem : "P1",
        Type : 1,
        subject : "english",
        Question : "You will be sorry ___ this later",
        Options : ["about","through","away","across"],
        answer : [1]
    });
    
    database.MultipleChoiceProblemCollection.insertOne({
        idProblem : "P2",
        name : "Đúng sai giới từ",
        Type : 2,
        subject : "english",
        Question : "You will be sorry ___ this later",
        Options : ["about","through","away","across"],
        answer : [1,0,0,0]
    });
    
    database.ShortAnswerCollection.insertOne({
        name : "Trả lời ngắn giới từ",
        idProblem : "P3",
        Type : 3,
        subject : "english",
        Question : "You will be sorry ___ this later",
        answer : "About"
    });
    
    database.CodingproblemCollection.insertOne({
        name : "Tổng 2 số",
        Type : 4,
        idProblem : "P4",
        subject : "information technology",
        Question : {
            topic : "Cho 2 số nguyên A và B. Hãy tính tổng A + B",
            input : "Gồm 1 dòng chứa 2 số nguyên A và B (1 <= A, B <= 1000), cách bởi 1 dấu cách.",
            output : "Ghi ra tổng A + B",
            example : [["1 1","2"],["3 4","7"]]
        },
        testcase : [["1 1","2"],["2 3","5"]]
    });
    
    database.MultipleChoiceProblemCollection.insertMany([
        {
            name : "Giới từ 1",
            Type : 1,
            subject : "english",
            Question : "I was amazed ___ her knowledge of French literature",
            Options : ["at","to","from","between"],
            answer : [1]
    
        },
    
        {
            name : "Giới từ 2",
            Type : 1,
            subject : "english",
            Question : "Doctors are worried ___ the possible spread of the disease.",
            Options : ["over","upon","about","around"],
            answer : [1]
        },
    
        {
            name : "Giới từ 3",
            Type : 1,
            subject : "english",
            Question : "We arrived ___ Ho chi minh city at 9pm on hot summer day.",
            Options : ["in","on","from","for"],
            answer : [1]
        },
    
        {
            name : "Giới từ 4",
            Type : 1,
            subject : "english",
            Question : "Too much candy is bad ___ your teeth",
            Options : ["of","for","by","with"],
            answer : [1]
        },
    ])
}

if (!config.mongoURI) throw new Error("unknow URI");
const client = new MongoClient(config.mongoURI);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routers);


app.listen(config.port, () => {
    console.log(`Server is running PORT: ${config.port}`);
})