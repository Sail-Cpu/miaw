import express from "express";
import {PrismaClient} from "@prisma/client";
import _ from 'lodash';
import {apiKeyMiddleware} from "../auth.js";

const router = express.Router();

const prisma = new PrismaClient();

router.get('/speed-line', apiKeyMiddleware, async (req, res) => {
    try{
        await prisma.$connect();

        const allLines = await prisma.speed_line.findMany();
        const randomLines = _.sampleSize(allLines, 10);
        return res.status(200).send({result: randomLines});
    }catch (error){
        return res.status(500).send({
            result: false, message: "An internal error has occurred on the server"
        });
    }finally {
        await prisma.$disconnect();
    }
});

export default router;