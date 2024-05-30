import express from "express";
import {PrismaClient} from "@prisma/client";
import authMiddleware, {apiKeyMiddleware} from "../auth.js";
import axios from "axios";

const router = express.Router();

const prisma = new PrismaClient();

router.get('/apps', apiKeyMiddleware, async (req, res) => {
    try{
        const categoriesWithApps = await prisma.app_categories.findMany({
            include: {
                applications: true
            }
        });

        const formattedData = await Promise.all(categoriesWithApps.map(async category => {
            const apps = await Promise.all(category.applications.map(async app => {
                const logo = await axios.get(`http://localhost:3000/image/logo/${app.app_name}`, {
                    headers: {
                        "x-api-key": process.env.API_KEY
                    }
                })
                const inter = await axios.get(`http://localhost:3000/image/interface/${app.app_name}`, {
                    headers: {
                        "x-api-key": process.env.API_KEY
                    }
                })
                return {
                    app_id: app.app_id,
                    app_name: app.app_name,
                    app_logo: logo.data.result,
                    app_interface: inter.data.result
                };
            }));

            return {
                category: {
                    id: category.categorie_id,
                    name: category.categorie_name
                },
                apps
            };
        }));

        return res.status(200).send({success: true, result: formattedData});
    }catch (error){
        return res.status(500).send({success: false, message: error})
    }finally {
        await prisma.$disconnect();
    }
})

router.get(`/categories`, apiKeyMiddleware,async (req, res) => {
    try{
        const categoriesWithApps = await prisma.app_categories.findMany();
        res.status(200).send({success: true, result: categoriesWithApps})
    }catch (error){
        res.status(500).send({success: false, message: error})
    }finally {
        await prisma.$disconnect();
    }
})

router.get(`/app/:appId`, apiKeyMiddleware,async (req, res) => {
    const { appId } = req.params;
    try{
        const appById = await prisma.applications.findMany({
            where: {
                app_id: parseInt(appId)
            }
        });

        const logo = await axios.get(`${process.env.API_URL}/image/logo/${appById[0].app_name}`, {
            headers: {
                "x-api-key": process.env.API_KEY
            }
        })
        const inter = await axios.get(`${process.env.API_URL}/image/interface/${appById[0].app_name}`, {
            headers: {
                "x-api-key": process.env.API_KEY
            }
        })

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
            return res.status(200).send({ success: true, result: { data: {...appById[0], app_logo: logo.data.result , app_interface: inter.data.result }, chapters: formattedChapters }});
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

router.post(`/app`, authMiddleware, async (req, res) => {
    try{
        const {name, description, categorie} = req.body;
        const createApp = await prisma.applications.create({
            data: {
                app_name: name,
                app_description: description,
                categorie_id: parseInt(categorie)
            },
        })
        return res.status(200).send({ success: true, result: createApp });
    }catch (error){
        console.log(error)
        return res.status(500).send({success: false, message: error})
    }
})

router.post("/shortcut", authMiddleware, async (req, res) => {
    try{
        const {name, description, chapter_id, app_id, keys} = req.body;
        const createShortcut = await prisma.shortcuts.create({
            data: {
                shortcut_name: name,
                shortcut_desc: description,
                chapter_id: parseInt(chapter_id),
                app_id: parseInt(app_id),
            }
        }
        );
        await Promise.all(keys.map(async (key) => {
            const createShortcut_key = await prisma.shortcuts_keys.create({
                data: {
                    shortcut_id: createShortcut.shortcut_id,
                    key_id: key
                }
            });
        }));
        return res.status(200).send({ success: true, result: createShortcut });
    }catch (error){
        console.log(error)
        return res.status(500).send({success: false, message: error})
    }
})

export default router;