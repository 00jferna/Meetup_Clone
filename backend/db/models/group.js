"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Group.hasMany(models.Groupimage, {
        foreignKey: "groupId",
      });

      Group.hasMany(models.Event, {
        foreignKey: "groupId",
      });

      Group.hasMany(models.Venue, {
        foreignKey: "groupId",
      });

      Group.hasMany(models.Membership, {
        foreignKey: "groupId",
      });

      Group.belongsTo(models.User, {
        as: "Organizer",
        foreignKey: "organizerId",
      });
    }
  }
  Group.init(
    {
      organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [0, 60],
            msg: "Name must be 60 characters or less",
          },
        },
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [50, 600],
            msg: "About must be 50 characters or more",
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
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          customValidation(value) {
            if (value !== true && value !== false) {
              throw new Error("Private must be a boolean");
            }
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 30],
            msg: "City is required",
          },
          notNull: {
            msg: "City is required",
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 30],
            msg: "State is required",
          },
          notNull: {
            msg: "State is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Group",
      defaultScope: {
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        newGroup: {
          attributes: {
            exclude: [],
          },
        },
        updatedGroup: {
          attributes: {
            exclude: [],
          },
        },
      },
    }
  );
  return Group;
};
