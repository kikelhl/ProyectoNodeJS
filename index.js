const morgan = require('morgan');
const express = require('express');
const app = express();
const usuarios = require('./routes/usuarios');
const administradores = require('./routes/administradores');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    return res.status(200).json({code: 200, message: "Bienvenido al sistema" });
});

app.use("/usuarios", usuarios);
app.use("/administradores", administradores);

app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "URL no encontrado" });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running... ");
});