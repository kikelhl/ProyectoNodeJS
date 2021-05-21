const morgan = require('morgan');
const express = require('express');
const app = express();
const usuarios = require('./routes/usuarios')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    return res.status(200).send("Bienvenido al sistema");
});

app.use("/usuarios", usuarios);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running... ");
});