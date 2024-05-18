import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
//router
import userRouter from "./router/users/route.js";
import appRouter from "./router/applications/route.js";
import speedRouter from "./router/speed/route.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(userRouter);
app.use(appRouter);
app.use(speedRouter);

app.listen(3000, () => {
    console.log("The server is running on port 3000.");
})