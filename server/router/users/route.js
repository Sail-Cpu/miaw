// @ts-ignore
import express from "express";
// @ts-ignore
import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();


const checkIfExists = async () => {
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

router.post(`/signup`, async (req, res) => {
    const { username, email, password } = req.body;

    if(username && email && password){
        try{
            if(await checkIfExists("username", username)) {
                return res.status(409).send({message: "Username already exists"})
            }
            if(await checkIfExists("email", email)) {
                return res.status(409).send({message: "The email address is already taken"})
            }
            if(!checkPassword(password)) return res.status(400).send({
                message: "The password must contain at least 8 characters, one capital and one number"
            })
            bcrypt.hash(password, 10, async (err, hash) => {
                if(err) throw err;
                const newUsers = await prisma.users.create({
                    data: {
                        username: username,
                        email: email,
                        password: hash
                    },
                })
                res.status(201).send({
                    data: newUsers
                })
            })
        } catch (error){
            return res.status(500).send({message: "An internal error has occurred on the server"})
        }finally {
            await prisma.$disconnect();
        }
    }else{
        return res.status(400).send(
            {message: "The server was unable to satisfy the request, information is missing"
            })
    }
})

export default router;