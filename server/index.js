import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path"
import { fileURLToPath } from 'url'; // Importez la fonction fileURLToPath pour convertir une URL en chemin de fichier

const __filename = fileURLToPath(import.meta.url); // Obtenez le chemin du fichier actuel
export const __dirname = path.dirname(__filename);
//router
import userRouter from "./router/users/route.js";
import appRouter from "./router/applications/route.js";
import speedRouter from "./router/speed/route.js";
import imageRouter from "./router/image/route.js";
import keys from "./router/keys/route.js";

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(userRouter);
app.use(appRouter);
app.use(speedRouter);
app.use(imageRouter);
app.use(keys);

app.listen(3000, () => {
    console.log("The server is running on port 3000.");
})