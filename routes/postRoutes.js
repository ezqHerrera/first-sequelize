const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');

router.get('/posts', postController.getAllPosts);
router.post('/posts',
            [
                check('title', 'Este campo es obligatorio').not().isEmpty(),
                check('content', 'Este campo es obligatorio').not().isEmpty(),
                check('content', 'El post es demasiado largo.').isLength({max: 280}),
                validarCampos
            ],
            postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;