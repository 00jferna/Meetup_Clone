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
      Venue.belongsTo(models.Group, { as: "Group", foreignKey: "groupId" });

      Venue.hasMany(models.Event, {
        foreignKey: "venueId",
      });
    }
  }
  Venue.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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
        type: DataTypes.FLOAT,
        validate: {
          customValidation(value) {
            if (Math.abs(value) > 90) {
              throw new Error("Latitude is not valid");
            }
          },
        },
      },
      lng: {
        type: DataTypes.FLOAT,
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
      scopes: {
        newVenue: {
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      },
    }
  );
  return Venue;
};
