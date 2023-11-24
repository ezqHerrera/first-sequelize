const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, 'super-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido' });
        }

        req.userId = decoded.userId;
        next();
    });
}

// Ruta protegida
router.get('/protected', verifyToken, (req, res) => {
    // Si el token es válido, el usuario tiene acceso
    res.json({ message: 'Ruta protegida accedida con éxito' });
});

module.exports = router;