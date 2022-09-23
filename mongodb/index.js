const express = require("express");
const mongoose = require("mongoose");

const modelColor = require("./models/Color");
const modelAnimal = require("./models/Animal");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("connect");
  })
  .catch(() => {
    console.log("error");
  });

// ROUTES

app.get("/api/colors", async (req, res) => {
  try {
    const colors = await modelColor.find({});

    return res.status(200).json({
      docs: colors,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      docs: [],
      success: false,
      message: "Hubo un error",
    });
  }
});

app.post("/api/color", async (req, res) => {
  const { nombre, hex } = req.body;

  try {
    const color = await modelColor.create({ nombre, hex });

    return res.status(200).json({
      doc: color,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      doc: null,
      success: false,
    });
  }
});

app.get("/api/animals", async (req, res) => {
  try {
    const animals = await modelAnimal.find(
      { color: "632d2ca6063bf3ad1b2fbaee" },
      null,
      {
        populate: [
          {
            path: "color",
            model: modelColor,
          },
        ],
      }
    );

    return res.status(200).json({
      docs: animals,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      docs: [],
      success: false,
      message: "Hubo un error",
    });
  }
});

app.post("/api/animal", async (req, res) => {
  const { especie, color } = req.body;

  try {
    const animal = await modelAnimal.create({ especie, color });

    return res.status(200).json({
      doc: animal,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      doc: null,
      success: false,
    });
  }
});

app.put("/api/animal/:id", async (req, res) => {
  const { id } = req.params;
  const { especie, color, activo } = req.body;

  try {
    const animal = await modelAnimal.findByIdAndUpdate(
      id,
      { especie, color, activo },
      { new: true }
    );

    return res.status(200).json({
      doc: animal,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      doc: null,
      success: false,
    });
  }
});

app.delete("/api/animal/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const animal = await modelAnimal.findByIdAndDelete(id);

    return res.status(200).json({
      doc: animal,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      doc: null,
      success: false,
    });
  }
});

app.listen(4000, () => {
  console.log("Ready");
});
