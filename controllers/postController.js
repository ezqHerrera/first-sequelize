const Post = require('../models/post');

exports.getAllPosts = async(req, res) => {
    try {
        const posts = await Post.findAll({order: [['updatedAt', 'DESC']]});
        res.status(200).json({
            ok: true,
            posts
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los datos', error
        })
    }
}

exports.createPost = async(req, res) => {
    try {
        const newPost = req.body;
        console.log(req.body);

        await Post.create(newPost);
        res.status(201).json({
            ok: true,
            msg: 'Se ha creado un nuevo post'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los datos: ', error
        })
    }
}

exports.updatePost = async(req, res) => {
    try {
        const postId = req.params.id;
        const {title, content, url} = req.body;
        const updatedPost = {title, content, url};

        await Post.update(updatedPost, {
            where: {
                id: postId
            }
        });

        res.status(200).json({
            ok: true,
            msg: `Se actualizó el post ${postId}`
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los datos: ', error
        })
    }
}

exports.deletePost = async(req, res) => {
    try {
        const idPost = req.params.id;
        const post = await Post.findByPk(idPost); // Busca por clave primaria
        // await Post.destroy(deadPost, {
        //     where: {
        //         id: idPost
        //     }
        // });
        await post.destroy();
        res.status(200).json({
            ok: true,
            msg: `Se ha eliminado el post ${idPost}`
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error:', error
        })
    }
}