import express from "express";
import {PrismaClient} from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

router.get('/apps', async (req, res) => {
    try{
        const categoriesWithApps = await prisma.app_categories.findMany({
            include: {
                applications: true
            }
        });

        const formattedData = categoriesWithApps.map(category => {
            return {
                category: {
                    id: category.categorie_id,
                    name: category.categorie_name
                },
                apps: category.applications.map(app => {
                    return {
                        app_id: app.app_id,
                        app_name: app.app_name
                    };
                })
            };
        });

        return res.send({data: formattedData});
    }catch (error){
        return res.status(500).send({message: error})
    }finally {
        await prisma.$disconnect();
    }
})

router.get(`/app/:appId`, async (req, res) => {
    const { appId } = req.params;
    try{
        const appById = await prisma.applications.findMany({
            where: {
                app_id: parseInt(appId)
            }
        });
        if(appById.length > 0){
            return res.send({data: appById[0]});
        }else{
            return res.status(400).send({message: "the software could not be found"})
        }
    }catch (error){
        return res.status(500).send({message: error})
    }finally {
        await prisma.$disconnect();
    }
})

export default router;