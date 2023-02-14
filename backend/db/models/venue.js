"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Venue.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Street address is required",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "City is required",
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "State is required",
          },
        },
      },
      lat: {
        type: DataTypes.STRING,
        validate: {
          customValidation(value) {
            if (Math.abs(value) > 90) {
              throw new Error("Latitude is not valid");
            }
          },
        },
      },
      lng: {
        type: DataTypes.STRING,
        validate: {
          customValidation(value) {
            if (Math.abs(value) > 180) {
              throw new Error("Longitude is not valid");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Venue",
    }
  );
  return Venue;
};
