import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import path from "path";
import multer from "multer";

const router = express.Router();

const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Aucun fichier téléchargé.');
        }
        res.status(200).send({ image: `/uploads/${req.file.filename}` });
    } catch (error) {
        console.error('Erreur lors du téléchargement du fichier:', error);
        res.status(500).send('Une erreur est survenue lors du téléchargement du fichier.');
    }
});

export default router;