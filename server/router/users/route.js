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

const checkPseudo = async (username) => {
    if (username.length < 4 || username.length > 20) {
        return {
            result: false,
            message: "The username must contain between 3 and 20 characters."
        }
    } else if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
        return {
            result: false,
            message: "The username can only contain letters, numbers, hyphens, periods or underscores."
        }
    } else if (await checkIfExists("username", username)) {
        return {
            result: false,
            message: "the username is already taken"
        }
    } else {
        return {
            result: true,
            message: "The username is valid."
        }
    }
};

router.get('/user', async (req, res) => {
    const {username, email} = req.query;
    try{
        prisma.$connect()
        if(email && await checkIfExists("email", email)){
            return res.status(200).send({result: true, message: "the email is already taken"});
        }
        let pseudo = await checkPseudo(username);
        if(username && !pseudo.result){
            return res.status(200).send({result: true, message: pseudo.message});
        }
        return res.status(200).send({result: false, message: pseudo.message});
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
            let pseudo = await checkPseudo(username);
            if(!pseudo.result) {
                return res.status(409).send({success: false, message: pseudo.message})
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
                const userShortcuts = await prisma.shortcuts.findMany({
                    where: {
                        users_shortcuts: {
                            some: {
                                user_id: newUser.user_id
                            }
                        }
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

            if(userExist.length === 0) return res.status(400).send({
                success: false,
                message: "The users does not exist"
            });

            const userShortcuts = await prisma.shortcuts.findMany({
                where: {
                    users_shortcuts: {
                        some: {
                            user_id: userExist[0].user_id
                        }
                    }
                }
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

router.post(`/favorite/:add`, async (req, res) => {
    const{user_id, shortcut_id} = req.body;
    const {add} = req.params;
    if(user_id && shortcut_id){
        try {
            if(add === "true"){
                await prisma.users_shortcuts.create({
                    data: {
                        user_id: user_id,
                        shortcut_id: shortcut_id
                    }
                })
            }else{
                const drop = await prisma.users_shortcuts.delete({
                    where: {
                        user_id: user_id,
                        shortcut_id: shortcut_id
                    }
                });
            }
            const userShortcuts = await prisma.shortcuts.findMany({
                where: {
                    users_shortcuts: {
                        some: {
                            user_id: user_id
                        }
                    }
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