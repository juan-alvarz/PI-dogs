const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  let Temperamento = sequelize.define(
    "temperamento",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true, createdAt: "creado", updatedAt: false }
  );
};
