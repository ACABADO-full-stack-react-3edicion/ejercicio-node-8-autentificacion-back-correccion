const express = require("express");
const { listarItems } = require("../../db/controladores/items");

const router = express.Router();

router.get("/listado", async (req, res, next) => {
  try {
    const items = await listarItems(req.idUsuario);
    res.json(items);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
