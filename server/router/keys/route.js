import express from "express";
import {PrismaClient} from "@prisma/client";
import {apiKeyMiddleware} from "../auth.js";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/keys", apiKeyMiddleware, async (req, res) => {
    try{
        const keys = await prisma.keys.findMany();
        res.status(200).send({success: true, result: keys});
    }catch (error) {
        res.status(500).send({success: true, message: error});
    }finally{
        await prisma.$disconnect();
    }
});

export default router;