const morgan = require('morgan');
const express = require('express');
const app = express();
const usuarios = require('./routes/usuarios');
const administradores = require('./routes/administradores');
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index')
const cors = require('./middleware/cors')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);
app.use("/administradores", administradores);
app.use(auth);
app.use("/usuarios", usuarios);
app.use(notFound);

app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "URL no encontrado" });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running... ");
});