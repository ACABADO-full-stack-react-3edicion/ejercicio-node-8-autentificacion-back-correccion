const bcrypt = require("bcrypt");
const Usuario = require("../modelos/Usuario");

const crearUsuario = async (usuario, contrasenya) => {
  try {
    const contrasenyaEncriptada = await bcrypt.hash(contrasenya, 10);
    const nuevoUsuario = await Usuario.create({
      usuario,
      contrasenya: contrasenyaEncriptada,
    });
    return nuevoUsuario;
  } catch (err) {
    const nuevoError = new Error("No se ha podido crear el usuario");
    console.log(err.message);
    throw err.codigo ? err : nuevoError;
  }
};

const loginUsuario = async (usuario, contrasenya) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({
      usuario,
    });
    if (!usuarioEncontrado) {
      const nuevoError = new Error("Credenciales incorrectas");
      nuevoError.codigo = 403;
      throw nuevoError;
    }
    const contrasenyaCoincide = await bcrypt.compare(
      contrasenya,
      usuarioEncontrado.contrasenya
    );
    if (!contrasenyaCoincide) {
      const nuevoError = new Error("Credenciales incorrectas");
      nuevoError.codigo = 403;
      throw nuevoError;
    }
    return usuarioEncontrado._id;
  } catch (err) {
    const nuevoError = new Error(
      "No se han podido comprobar las credenciales del usuario"
    );
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = {
  loginUsuario,
  crearUsuario,
};
