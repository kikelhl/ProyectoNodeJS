const express = require('express');
const usuarios = express.Router();
const db = require('../config/database');

usuarios.post("/", (req, res, next) => {
    return res.status(200).json(req.body);
});

usuarios.get('/', async(req, res, next) => {
    const usr = await db.query("SELECT * FROM users");
    return res.status(200).json({code: 200, message: usr });
});

usuarios.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if (id >= 1 && id <= 2) {
        const usr = await db.query("SELECT * FROM users WHERE id = "+id+";")
        return res.status(200).json({code: 200, message: usr})
    }
    return res.status(404).json({code: 404, message: "Usuario no encontrado"});
    
});

usuarios.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const usr = await db.query("SELECT * FROM users WHERE name ='"+name+"';");
    if (usr.length > 0) {
        return res.status(200).json({code: 200, message: usr})
    }
    return res.status(404).json({code: 404, message: "Usuario no encontrado"});
        
});

module.exports = usuarios;