"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Groupimage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Groupimage.belongsTo(models.Group, {
        foreignKey: "groupid",
      });
    }
  }
  Groupimage.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Must be a valid URL",
          },
        },
      },
      groupid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      preview: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          customValidation(value) {
            if (value !== true && value !== false) {
              throw new Error("preview must be a boolean");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Groupimage",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      scopes: {
        newImage: {
          attributes: {
            exclude: ["groupid", "createdAt", "updatedAt"],
          },
        },
      },
    }
  );
  return Groupimage;
};
