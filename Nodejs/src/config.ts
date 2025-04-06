import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
    path : path.resolve(__dirname, "../../.env")
});

export default {
    mongoURI : process.env.URI,
    port : 8192
}