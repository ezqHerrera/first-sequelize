const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            ok: true,
            users
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message:'Error al obtener los datos: ', error
        })
    }
}

exports.getUserById = async(req, res) => {
    try {
        const idUser = req.params.id;
        const user = await User.findByPk(idUser);
        res.status(200).json({
            ok: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los datos: ', error
        })
    }
}

exports.createUser = async(req, res)=>{
    try {
        console.log(req.body);
        const {username, password, email, avatar} = req.body;

        const nuevoUsuario={
            username,
            password,
            email,
			avatar
        }
        const user = await User.create(nuevoUsuario);

        res.status(201).json({
            ok:true,
            user
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:'Server Error'
        })
    }
}

exports.updateUser = async(req, res) => {
    try {
        const idUser = req.params.id;
        const { username, password, email, avatar } = req.body;
        const updatedUser = { username, password, email, avatar };

        await User.update(updatedUser, {
            where: {
                id: idUser
            }
        });

        res.status(200).json({
            ok: true,
            msg: `Se actualizó el usuario ${idUser}`
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los datos:', error
        })
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const idUser = req.params.id;
        const user = await User.findByPk(idUser);

        await user.destroy();
        res.status(200).json({
            ok: true,
            msg: `Se eliminó el usuario ${idUser}`
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los datos:', error
        })
    }
}