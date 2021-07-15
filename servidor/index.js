require("dotenv").config();
const jwt = require("jsonwebtoken");
const debug = require("debug")("api-items:servidor:principal");
const cors = require("cors");
const express = require("express");
const morganFreeman = require("morgan");
const { error404, errorGeneral } = require("./errores");
const rutasUsuarios = require("./rutas/usuarios");
const rutasItems = require("./rutas/items");

const { app } = require("./init");
const { listarItems } = require("../db/controladores/items");

app.use(morganFreeman("dev"));
app.use(cors());
app.use(express.json());

app.use("/usuarios", rutasUsuarios);
app.use(
  "/items",
  async (req, res, next) => {
    if (!req.header("Authorization")) {
      const nuevoError = new Error("Falta el token de acceso");
      nuevoError.codigo = 403;
      return next(nuevoError);
    }
    const token = req.header("Authorization").split(" ")[1];
    try {
      const infoUsuario = jwt.verify(token, process.env.SECRET_JWT);
      const { idUsuario } = infoUsuario;
      req.idUsuario = idUsuario;
      next();
    } catch (err) {
      const nuevoError = new Error("Token no válido");
      nuevoError.codigo = 403;
      next(nuevoError);
    }
  },
  rutasItems
);

app.use(error404);
app.use(errorGeneral);
