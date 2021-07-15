const express = require("express");
const jwt = require("jsonwebtoken");
const {
  loginUsuario,
  crearUsuario,
} = require("../../db/controladores/usuarios");

const router = express.Router();

router.post("/registro", async (req, res, next) => {
  const { usuario, contrasenya } = req.body;
  try {
    const nuevoUsuario = await crearUsuario(usuario, contrasenya);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { usuario, contrasenya } = req.body;
  try {
    const idUsuario = await loginUsuario(usuario, contrasenya);
    const token = jwt.sign({ idUsuario }, process.env.SECRET_JWT, {
      expiresIn: "2d",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
