"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Membership.belongsTo(models.Group, {
        foreignKey: "groupid",
      });

      Membership.belongsTo(models.User, {
        foreignKey: "userid",
      });
    }
  }
  Membership.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      groupid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Membership",
    }
  );
  return Membership;
};