import jwt from 'jsonwebtoken';

export const createKey = (userId, username) => {
    const payload = {
        userId: userId,
        username: username
    };

    const secretKey = process.env.API_SECRET_KEY;

    const options = {
        expiresIn: '2h'
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
}

export const  apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey && apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(401).json({ message: 'Invalid API Key' });
    }
}

const  authMiddleware = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];

        jwt.verify(bearerToken, process.env.API_SECRET_KEY, (err, authData) => {
            if (err) {
                res.sendStatus(403); // Forbidden
            } else {
                next();
            }
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

export default authMiddleware;