const debug = require("debug")("api-items:servidor:errores");
const chalk = require("chalk");

const error404 = (req, res, next) => {
  res.status(404).json({ error: true, mensaje: "Endpoint no encontrado" });
};
const errorGeneral = (err, req, res, next) => {
  const status = err.codigo || 500;
  const mensaje = err.codigo ? err.message : "Error general en el servidor";
  debug(chalk.red(err.message));
  res.status(status).json({ error: true, mensaje });
};

module.exports = {
  errorGeneral,
  error404,
};
