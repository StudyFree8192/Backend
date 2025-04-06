import { Router, Response } from 'express';
import database from '../api/database';

const router = Router();

router.post("/", async (req, res) => {
    const {page, maxProblem} = req.body;
    const start = maxProblem * page - (maxProblem - 1);
    const data = await database.ProblemCollection.find()
    .skip(start - 1)
    .limit(maxProblem);
    res.send(data);
});

router.post("/:id", async (req, res) => {    
    const id = req.params.id;
    const problemData = await database.ProblemCollection.find({_id : id});
    res.send(problemData);
});

export default router;