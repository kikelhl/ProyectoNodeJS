const express = require('express');
const administradores = express.Router();
const db = require('../config/database');

administradores.post("/", async (req, res, next) => {
    const { admin_name, admin_email, admin_password } = req.body;

    if (admin_name && admin_email && admin_password) {
        let query = "INSERT INTO admins (admin_name, admin_email, admin_password)"
        query += `VALUES('${admin_name}','${admin_email}','${admin_password}');`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Adminstrador registrado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }  
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

administradores.get("/", async (req, res, next) => {
    const query = "SELECT * from admins";
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows});
});

module.exports = administradores;