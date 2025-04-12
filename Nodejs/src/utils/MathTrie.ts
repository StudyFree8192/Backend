class TrieNode {
    children : {[key : string] : TrieNode};
    isEndOfWord : boolean;
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    root : TrieNode;
    constructor() {
        this.root = new TrieNode();
    };

    insert(word : string) {
        let node : TrieNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word : string, startIndex : number, codeMath : boolean = true) : {
        text : string,
        newIndex : number
    } {
        let node : TrieNode = this.root;
        let textWord : string = "";
        let currentIndex = startIndex;

        if (!codeMath && word.slice(currentIndex, Math.min(currentIndex + 5, word.length)) == "Math.") {
            currentIndex = Math.min(currentIndex + 4, word.length - 1);
            textWord = "Math.";
        } else if (!codeMath) {
            textWord = word[currentIndex];
        }
        
        else {
            for (let i = startIndex; i < word.length; i++) {
                let char = word[i];
    
                if (!node.children[char]) break;
                textWord += char;
                currentIndex = i;
                node = node.children[char];
            }
        }
        return {
            text : textWord, 
            newIndex : (currentIndex)
        };
    }
}

const MathTrie = new Trie;
const CodeMath = [
    "Math.",
    "text",
    "sqrt",
    "pow",
    "integrate",
    "log",
    "frac"
]

for (const Code of CodeMath) MathTrie.insert(Code);
export default MathTrie;