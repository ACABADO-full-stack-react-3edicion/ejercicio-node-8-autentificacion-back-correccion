const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
  nombre: String,
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

const Item = model("Item", ItemSchema, "items");

module.exports = Item;
