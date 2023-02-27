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
      Attendance.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Attendance.belongsTo(models.Event, {
        foreignKey: "eventId",
      });
    }
  }
  Attendance.init(
    {
      status: {
        type: DataTypes.ENUM("attending", "waitlist", "pending"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["attending", "waitlist", "pending"]],
            msg: "Status must be 'attending', 'waitlist', or 'pending'",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Attendance",
      defaultScope: {
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        newAttendance: {
          attributes: {
            exclude: ["id", "eventId", "createdAt", "updatedAt"],
          },
        },
        updatedAttendance: {
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      },
    }
  );
  return Attendance;
};
