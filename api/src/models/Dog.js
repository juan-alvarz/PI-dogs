const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  let Dog = sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.INTEGER,
        //DefaultValue: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lifeSpan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      temperament: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      created: {
        type: DataTypes.STRING,
        defaultValue: "API",
      },
    },
    { timestamps: true, createdAt: "creado", updatedAt: false }
  );
};
