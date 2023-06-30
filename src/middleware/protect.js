const jwt = require('jsonwebtoken');

const jwtSecretToken = 'CSI-is-the-best';

const jwtVerifyPromisified = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {}, (err, payload) => {
            if (err) {
                reject(err);
            } else {
                resolve(payload);
            }
        });
    });
};

export const protect = catchAsync(
    async (req, res, next) => {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        )
            token = req.headers.authorization.split(' ')[1];
        if (!token)
            return res.status(400).json({ error: 'Username must be alphanumeric' });

        const decoded = await jwtVerifyPromisified(
            token,
            jwtSecretToken
        )
        .catch((err) => {
            return res.status(400).json({ error: err.message });
        });
        
        req.user = decoded;
        next();
    }
);