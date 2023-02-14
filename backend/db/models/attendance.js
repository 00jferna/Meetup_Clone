"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendance.init(
    {
      status: {
        type: DataTypes.ENUM("member", "waitlist", "pending"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["member", "waitlist", "pending"]],
            msg: "Status must be 'member', 'waitlist', or 'pending'",
          },
        },
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
