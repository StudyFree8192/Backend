// import { MongoClient } from "mongodb";
import config from "../config";
import mongoose from "mongoose";

if (!config.mongoURI) throw new Error("unknow URI");
const connect = mongoose.connect(config.mongoURI);
connect.then(() => {
    console.log("Successfully connect!");
}).catch(() => {
    console.log("Error");
});

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    
    email : {
        type : String,
        require : true
    },

    password : {
        type : String,
        require : true
    }
});

const BaseProblemSchema = new mongoose.Schema({
    contest: {
        type: String,
        required: false
    },

    subject : {
        type : String,
        require : false
    },

    name : {
        type : String,
        require : true
    },

    // Type : 1 Trắc nghiệm
    // Type : 2 Trắc nghiệm đúng sai
    // Type : 3 Trả lời ngắn
    // Type : 4 Lập trình
    Type : {
        type : Number,
        require : true
    }
});

const MultipleChoiceProblemSchema = new mongoose.Schema({
    Question : {
        type : String,
        require : true
    },

    Options : {
        type : [String],
        require : true
    },

    answer : {
        type : [Number],
        require : true
    }
})

const ShortAnswerSchema = new mongoose.Schema({
    Question : {
        type : String,
        require : true,
    },

    answer : {
        type : String,
        require : true
    }
})

const CodingproblemSchema = new mongoose.Schema({
    Question : {
        type : {
            topic : {type : String, require : true},
            input : {type : String, require : true},
            output : {type : String, require : true},
            constrain : {type : String, require : true},
            example : {type : [[String]], require : true},
        },
        require : true
    },

    testcase : {
        type : [[String]],
        require : true
    }
})

const contestSchema = new mongoose.Schema({
    Type : {
        type : Number,
        require : true
    },

    subject : {
        type : String,
        require : true
    },

    nameContest : {
        type : String,
        require : true
    },

    IdProblems : {
        type : [String],
        require : true
    }
});

const Problem = mongoose.model("Problem", BaseProblemSchema, "Problem");
const MultipleChoiceProblemCollection = Problem.discriminator('MultipleChoiceProblem', MultipleChoiceProblemSchema);
const ShortAnswerCollection = Problem.discriminator('ShortAnswer', ShortAnswerSchema)
const CodingproblemCollection = Problem.discriminator('Codingproblem', CodingproblemSchema)

export default {
    Usercollection : mongoose.model("User", userSchema, "User"),
    ProblemCollection : Problem,
    MultipleChoiceProblemCollection,
    ShortAnswerCollection,
    CodingproblemCollection,
    ContestCollection : mongoose.model("Contest", contestSchema, "Contest")
}

// interface MultipleChoiceQuestion {
//     type: 1 | 2;
//     question: string;
//     options: [string, string, string, string];
// }

// interface TextQuestion {
//     type: 3;
//     question: string;
// }

// type Question = MultipleChoiceQuestion | TextQuestion;

// async function AddData(client : MongoClient, QuestionsList : Question[]) {
//     try {
//         await client.connect();
//         const db = client.db("StudyFree");
//         const exerciseCollection = db.collection("exercise");
//         const id = 1;

//         const data : {id : number, Q : Question[]} = {
//             id : id,
//             Q : QuestionsList
//         }

//         const result = await exerciseCollection.insertOne(data);
//     } catch (error) {
//         console.log(error);
//     }
// }