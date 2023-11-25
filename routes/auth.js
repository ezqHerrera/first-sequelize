const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const {body} = require('express-validator');

// Endpoint de inicio de sesión
router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ userId: user.id }, 'super-secret-key', {expiresIn: '24h'});

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Endpoint de registro
router.post('/register',
    // Validaciones del registro
    body('email', 'Este campo es obligatorio').not().isEmpty(),
    body('email', 'La dirección es inválida').isEmail(),
    body('password', 'Este campo es obligatorio').not().isEmpty(),
    body('password', 'Debe tener como mínimo 6 caracteres').isLength({min: 6}),
    body('username', 'Este campo es obligatorio').not().isEmpty(),

    async(req, res) => {
        const {username, password, email, avatar} = req.body;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
        try {
            if (!(username && password && email)) {
                res.status(400).json({
                    msg: 'Los campos de email, nombre y contraseña son obligatorios.'
                })
            }
			const newUser = await User.create({username, password: hashedPassword, email, avatar});
			res.status(201).json({
				newUser
			})
			
			} catch(error) {
            res.status(500).json({
                msg: `Error en la base de datos: ${error}`
            });
        }
});

module.exports = router;