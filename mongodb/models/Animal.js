const mongoose = require("mongoose");

const animal = new mongoose.Schema({
  especie: {
    type: String,
    unique: true,
    require: true,
  },
  color: {
    type: mongoose.Types.ObjectId,
    ref: "colors",
    require: true,
  },
  activo: {
    type: Boolean,
    require: false,
    default: true,
  },
});

const modelAnimal = mongoose.model("animals", animal);

module.exports = modelAnimal;
