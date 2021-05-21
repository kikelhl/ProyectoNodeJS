const express = require('express');
const usuarios = express.Router();
const db = require('../config/database');

usuarios.post("/", async (req, res, next) => {
    const {name, last_name, number, email, address } = req.body;
    
    if (name && last_name && number && email && address) {
        let query = "INSERT INTO users(name, last_name, number, email, address)";
        query += `VALUES ('${name}','${last_name}','${number}','${email}','${address}');`

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario insertado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

usuarios.delete('/:id([0-9]{1,3})', async (req, res, next) => {

    const query = `DELETE FROM users WHERE id = ${req.params.id};`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Usuario borrado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Usuario no encontrado" });

});

usuarios.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const {name, last_name, number, email, address } = req.body;

    if (name && last_name && number && email && address) {
        let query = `UPDATE users SET name= '${name}', last_name= '${last_name}', number= '${email}', address='${address}' `;
        query += `WHERE id = ${req.params.id};`;

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Usuario actualizado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" });

    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });


});

usuarios.patch('/:id([0-9]{1,3})', async (req, res, next) => {

    if (req.body.name) {
        let query = `UPDATE users SET name= '${req.body.name}' WHERE id = ${req.params.id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Usuario actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Usuario no encontrado" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });

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