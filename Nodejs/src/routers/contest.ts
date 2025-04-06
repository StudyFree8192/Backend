import { Router } from "express";
import database from "../api/database";

const router = Router();

router.post("/:id", async (req, res) => {
    const id = req.params.id;
    const ContestData = await database.ContestCollection.find({_id : id});

    let Contest = [];
    // for (let i = 0; i < ContestData.length; i++) {
    //     let IdProblem = ContestData[0].IdProblems[i];
    //     const Problem = await database.ProblemCollection.find({_id : IdProblem});

    //     console.log(Problem);
    // }

    const problems = ContestData[0].IdProblems;

    for await (const id of problems) {
        const problem = await database.ProblemCollection.find({ _id: id });
        Contest.push(problem[0]);
    }

    console.log(Contest);
    res.send(Contest);
})

export default router;