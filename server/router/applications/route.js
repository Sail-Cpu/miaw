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

        return res.status(200).send({success: true, result: formattedData});
    }catch (error){
        return res.status(500).send({success: false, message: error})
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
            const chapters = await prisma.chapters.findMany({
                include: {
                    shortcuts: {
                        where: {
                            app_id: parseInt(appId)
                        },
                        include: {
                            shortcuts_keys: {
                                include: {
                                    keys: true
                                }
                            }
                        }
                    }
                }
            });

            const formattedChapters = chapters.map(chapter => {
                return {
                    ...chapter,
                    shortcuts: chapter.shortcuts.map(shortcut => {
                        return {
                            ...shortcut,
                            shortcuts_keys: shortcut.shortcuts_keys.reduce((acc, shortcut_key) => {
                                acc[0].push(shortcut_key.keys.key_win);
                                acc[1].push(shortcut_key.keys.key_mac);
                                return acc;
                            }, [[], []])
                        };
                    })
                };
            });
            return res.status(200).send({ success: true, result: { data: appById[0], chapters: formattedChapters }});
        }else{
            return res.status(400).send({success: false, message: "the software could not be found"})
        }
    }catch (error){
        console.log(error)
        return res.status(500).send({success: false, message: error})
    }finally {
        await prisma.$disconnect();
    }
})

export default router;