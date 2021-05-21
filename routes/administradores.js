const express = require('express');
const jwt = require('jsonwebtoken');
const administradores = express.Router();
const db = require('../config/database');

administradores.post("/signin", async (req, res, next) => {
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

administradores.post("/login", async (req, res, next) => {
    const {admin_email, admin_password} = req.body;
    const query = `SELECT * from admins WHERE admin_email = '${admin_email}' AND admin_password = '${admin_password}';`;
    const rows = await db.query(query);

    if (admin_email && admin_password) {
        if(rows.length == 1) {
            const token = jwt.sign({
                admin_id: rows[0].admin_id,
                admin_password: rows[0].admin_password
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }
        else {
            return res.status(401).json({code: 401, message: "Usuario Y/O contraseña incorrectos"});
        }
    }
    return res.status(401).json({code: 500, message: "Campos incompletos"});    
});

administradores.get("/", async (req, res, next) => {
    const query = "SELECT * from admins";
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows});
});

module.exports = administradores;