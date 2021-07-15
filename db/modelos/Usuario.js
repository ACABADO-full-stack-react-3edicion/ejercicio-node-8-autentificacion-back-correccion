const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  usuario: {
    type: String,
    unique: true,
    required: true,
  },
  contrasenya: {
    type: String,
    minLength: 6,
    required: true,
  },
});

const Usuario = model("Usuario", UsuarioSchema, "usuarios");

module.exports = Usuario;
