import { Router } from "express";
import MathTrie from "../utils/MathTrie";

const router = Router();

function handleCode(word : string, index : number = 0) : {
    textListSeparatedBySemicolons : string[],
    index : number
} {
    word = `(${word})`;
    let text : string = "";
    let stack : number[] = [index - 1];
    let textListSeparatedBySemicolons : string[] = [];
    index++;

    while (stack.length != 0 && index < word.length) {
        const MathMatch = MathTrie.search(word, index, false);
        index = MathMatch.newIndex;
        if (MathMatch.text == "Math.") {
            const CodeMatch = MathTrie.search(word, index + 1);
            index = CodeMatch.newIndex + 1;

            if (word[index] == "(") {
                const textResult = handleCode(word, index + 1);
                index = textResult.index;


                const resultList = textResult.textListSeparatedBySemicolons;
                switch (CodeMatch.text) {
                    case "text":
                        text += `\\(\\ {${resultList[0]}} \\)`;
                        break;
                    
                    case "sqrt":
                        if (resultList.length == 1 || resultList[1] == "2")
                            text += `\\sqrt{${resultList[0].trim()}}`;
                        else text += `\\sqrt[${resultList[1].trim()}]{${resultList[0].trim()}}`;
                        break;
                    
                    case "integrate":
                        if (resultList.length >= 4)
                            text += `\\int_{${resultList[2]}}^{${resultList[3]}} ${resultList[0]} \\, ${resultList[1]}`;
                        else if (resultList.length >= 2)
                            text += `\\int ${resultList[0]} \\, ${resultList[1]}`;
                        break;
                    
                    case "log":
                        if (resultList.length == 1 || resultList[1] == "10")
                            text += `\\log ${resultList[0]}`;
                    
                        else if (resultList.length >= 2)
                            text += `\\log_${resultList[1]} ${resultList[0]}`;
                        break;
                    
                    case "frac":
                        text += `\\frac{${resultList[0]}}{${resultList[1]}}`
                        break;
                }
            } else {
                text += MathMatch.text + CodeMatch.text;
            }
        } else {
            if (word[index] == "(") stack.push(index);
            if (word[index] == ")") {
                stack.pop();
                if (stack.length == 0) continue;
            }

            if (word[index] == ";") {
                textListSeparatedBySemicolons.push(text);
                text = "";
            }
            else text += word[index];

            // console.log(MathMatch.text);
            index++;
        }
    }

    textListSeparatedBySemicolons.push(text);
    return {
        textListSeparatedBySemicolons : textListSeparatedBySemicolons,
        index : index
    }
}

router.post("/handleCodeMath", (req, res) => {
    const { MathText } = req.body;
    const ABC = handleCode(MathText).textListSeparatedBySemicolons;
    res.send(ABC[0]);
})

export default router;