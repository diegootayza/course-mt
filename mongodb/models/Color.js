const mongoose = require("mongoose");

const color = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  hexadecial: {
    type: String,
    unique: true,
    require: true,
  },
  activo: {
    type: Boolean,
    require: false,
    default: true,
  },
});

const modelColor = mongoose.model("colors", color);

module.exports = modelColor;
