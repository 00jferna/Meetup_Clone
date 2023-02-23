"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Group, { as: "Group", foreignKey: "groupId" });

      Event.belongsTo(models.Venue, { as: "Venues",
        foreignKey: "venueId",
      });

      Event.hasMany(models.Attendance, {
        foreignKey: "eventId",
      });

      Event.hasMany(models.EventImage, {
        foreignKey: "eventId",
      });
    }
  }
  Event.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      venueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 60],
            msg: "Name must be at least 5 characters",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
        },
      },
      type: {
        type: DataTypes.ENUM("Online", "In person"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["Online", "In person"]],
            msg: "Type must be 'Online' or 'In person'",
          },
        },
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Capacity must be an integer",
          },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          customValidation(value) {
            if (new Date(value) < new Date()) {
              throw new Error("Start date must be in the future");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          customValidation(value) {
            if (new Date(value) < this.startDate) {
              throw new Error("End date is less than start date");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Event",
      defaultScope: {
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return Event;
};
