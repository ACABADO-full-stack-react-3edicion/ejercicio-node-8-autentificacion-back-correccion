const Item = require("../modelos/Item");
const Usuario = require("../modelos/Usuario");

const listarItems = async (idUsuario) => {
  try {
    const usuarioExiste = await Usuario.findById(idUsuario);
    if (!usuarioExiste) {
      const nuevoError = new Error("No existe el usuario con esta id");
      nuevoError.codigo = 403;
      throw nuevoError;
    }
    const items = await Item.find({
      idUsuario,
    });
    return items;
  } catch (err) {
    const nuevoError = new Error("No se ha podido obtener el listado de items");
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = {
  listarItems,
};
