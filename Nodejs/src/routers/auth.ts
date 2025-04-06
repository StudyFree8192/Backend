import { Router, Response } from 'express';
import Database from '../api/database';

function error(res : Response, statusCode : number, message : string ) {
    res.status(statusCode);
    res.send({
        statusCode : statusCode,
        message : message
    });
}

const router = Router();

router.post("/signUp", async (req, res) => {
    const {username, email, password, reEnterPassword} = req.body;
    if (username == "") {
        error(res, 400, "Username empty");
        return;
    }

    if (email == "") {
        error(res, 400, "email empty");
        return;
    }

    if (password == "") {
        error(res, 400, "password empty");
        return;
    }

    if (reEnterPassword == "") {
        error(res, 400, "reEnterPassword empty");
        return;
    }
    
    if (password != reEnterPassword) {
        error(res, 400, "Password and rePassword not same");
        return;
    }

    const userdata = await Database.Usercollection.insertOne({
        name : username,
        email : email,
        password : password
    });
})

router.post("/signIn", async (req, res) => {
    const {username, password} = req.body;
    if (username == "") {error(res, 400, "Empty Name"); return;}
    if (password == "") {error(res, 400, "Empty Password"); return;}

    const userdata = await Database.Usercollection.find({
        name : username,
        password : password
    });

    if (userdata.length == 0) {
        error(res, 404, "username or password wrong");
        return;
    }

    console.log("Good")
    res.send({username, password});
})

export default router;