import { Router, Response } from 'express';
import database from '../api/database';

const router = Router();

router.post("/", async (req, res) => {
    const {type, page, maxProblem} = req.body;
    const start = maxProblem * page - (maxProblem - 1);

    if (type == "problem") {
        const data = await database.ProblemCollection.find()
        .skip(start - 1)
        .limit(maxProblem);
        res.send(data);
    } else {
        const data = await database.ContestCollection.find()
        .skip(start - 1)
        .limit(maxProblem);
        res.send(data);
    }
    
});

router.post("/create", async (req, res) => {
    const {questionList, nameQuestion} = req.body;

    for (let index = 0; index < questionList.length; index++) {
        switch (questionList[index].type) {
            case 1:
                database.MultipleChoiceProblemCollection.insertOne({
                    name : nameQuestion,
                    Type : 1,
                    Question : questionList[index].question,
                    Options : questionList[index].options,
                    answer : questionList[index].answer,
                    subject : "không biết"
                })
                break;
        } 
    }

    res.send({
        add : true
    });
})

router.post("/:id", async (req, res) => {    
    const id = req.params.id;
    const {type} = req.body;

    if (type == "problem") {
        const problemData = await database.ProblemCollection.find({_id : id});
        res.send([problemData, problemData[0].name]);
    }
    else {
        const ContestData = await database.ContestCollection.find({_id : id});
        let Contest = [];
        const problems = ContestData[0].IdProblems;
        for await (const id of problems) {
            const problem = await database.ProblemCollection.find({ _id: id });
            Contest.push(problem[0]);
        }
        res.send([Contest, ContestData[0].nameContest]);
    }
    
});



export default router;