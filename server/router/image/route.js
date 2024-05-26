import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import path, { dirname } from "path";
import multer from "multer";
import sharp from "sharp";
import * as fs from "fs";
import { __dirname } from "../../index.js";

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

router.post('/upload', upload.single('image'), async (req, res) => {
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

router.get('/image/:imageType/:imageName', async (req, res) => {
    try {
        const { imageType, imageName } = req.params;
        const extensions = ['png', 'jpg', 'jpeg', 'gif'];
        let imagePath;

        for (let ext of extensions) {
            let tempPath = path.join(__dirname, `public/uploads/${imageType}_${imageName.replaceAll(' ', '_')}.${ext}`);
            if (fs.existsSync(tempPath)) {
                imagePath = tempPath;
                break;
            }
        }
        if (imagePath) {
            let imageName = imagePath.split('\\').pop();
            imageName = imageName.replace(/^(logo_|interface_)/, '');
            res.status(200).send({success: true, result: imageName});
        } else {
            res.status(404).send({success: false, message: 'Image not found'});
        }
    } catch (error) {
        res.status(500).send( {success: false, message: 'Une erreur est survenue lors de la récupération de l\'image.'});
    }
});

export default router;