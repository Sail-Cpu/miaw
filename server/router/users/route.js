import express from "express";
import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();


const checkIfExists = async (field, value) => {
    const result = await prisma.users.findMany({
        where: {
            [field]: value
        }
    });
    return result.length > 0;
};

const checkPassword = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
}

router.get('/user', async (req, res) => {
    const {username, email} = req.query;
    try{
        prisma.$connect()
        if(email && await checkIfExists("email", email)){
            return res.status(200).send({result: true, message: "The user exist"});
        }
        if(username && await checkIfExists("username", username)){
            return res.status(200).send({result: true, message: "The user exist"});
        }
        return res.status(200).send({result: false, message: "The user does not exist"});
    }catch (error){
        return res.status(500).send({result: false, message: "An internal error has occurred on the server"});
    }finally {
        await prisma.$disconnect();
    }
})

router.post(`/signup`, async (req, res) => {
    const { username, email, password, job, os } = req.body;

    if(username && email && password && job && os){
        try{
            if(await checkIfExists("username", username)) {
                return res.status(409).send({success: false, message: "Username already exists"})
            }
            if(await checkIfExists("email", email)) {
                return res.status(409).send({
                    success: false,
                    message: "The email address is already taken"
                })
            }
            if(!checkPassword(password)) return res.status(400).send({
                success: false,
                message: "The password must contain at least 8 characters, one capital and one number"
            });
            bcrypt.hash(password, 10, async (err, hash) => {
                if(err) throw err;
                const newUser = await prisma.users.create({
                    data: {
                        username: username,
                        email: email,
                        password: hash,
                        job: job,
                        os: os
                    },
                });
                const userShortcuts = await prisma.users_shortcuts.findMany({
                    where: {
                        user_id: newUser.user_id
                    },
                    select: {
                        shortcuts: true
                    }
                });
                res.status(201).send({
                    success: true,
                    result: {...newUser, shortcuts: userShortcuts},
                    message: "the user is successfully logged in"
                })
            });
        } catch (error){
            return res.status(500).send({success: false, message: "An internal error has occurred on the server"});
        }finally {
            await prisma.$disconnect();
        }
    }else{
        return res.status(400).send(
            {success: false, message: "The server was unable to satisfy the request, information is missing"
            });
    }
})

router.post(`/signin`, async (req, res) => {
    const { nameEmail, password } = req.body;

    if(nameEmail && password){
        try{
            const userExist = await prisma.users.findMany({
                where: {
                    OR: [
                        {username: nameEmail},
                        {email: nameEmail}
                    ]
                }
            });
            const userShortcuts = await prisma.users_shortcuts.findMany({
                where: {
                    user_id: userExist[0].user_id
                },
                select: {
                    shortcuts: true
                }
            });

            if(userExist.length === 0) return res.status(400).send({
                success: false,
                message: "The users does not exist"
            });
            bcrypt.compare(password, userExist[0].password, (err, isTheSame) => {
                if(err) throw err;
                if(isTheSame) return res.status(200).send({
                    success: true,
                    result: {...userExist[0], shortcuts: userShortcuts},
                    message: "the user is successfully logged in"}
                );
                return res.status(400).send({success: false, message: "the password is incorrect" });
            })
        }catch (error){
            console.log(error)
            return res.status(500).send({
                success: false,
                message: "An internal error has occurred on the server"}
            );
        }finally {
            await prisma.$disconnect();
        }
    }else{
        return res.status(400).send(
            {message: "The server was unable to satisfy the request, information is missing"
            });
    }
})

router.post(`/addtofav`, async (req, res) => {
    const{user_id, shortcut_id} = req.body;
    if(user_id && shortcut_id){
        try {
            const addToFav = await prisma.users_shortcuts.create({
                data: {
                    user_id: user_id,
                    shortcut_id: shortcut_id
                }
            })

            const userShortcuts = await prisma.users_shortcuts.findMany({
                where: {
                    user_id: user_id
                },
                select: {
                    shortcuts: true
                }
            });

            res.status(201).send({
                success: true,
                result: userShortcuts
            })
        }catch (error){
            console.log(error)
            return res.status(500).send({success: false, message: "An internal error has occurred on the server"});
        }finally {
            await prisma.$disconnect();
        }
    }else{
        return res.status(400).send(
            {success: false, message: "The server was unable to satisfy the request, information is missing"
            });
    }
})

export default router;