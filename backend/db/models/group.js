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
        foreignKey: "groupid",
      });

      Group.hasMany(models.Event, {
        foreignKey: "groupid",
      });

      Group.hasMany(models.Membership, {
        foreignKey: "groupid",
      });

      Group.belongsTo(models.User, {
        foreignKey: "organizerid",
      });
    }
  }
  Group.init(
    {
      organizerid: {
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [50, 300],
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
            if (value !== true || value !== false) {
              throw new Error("Private must be a boolean");
            }
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
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
