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
        foreignKey: "groupId",
      });

      Membership.belongsTo(models.User, {as:"memberId",
        foreignKey: "userId",
      });
    }
  }
  Membership.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["co-host", "member", "pending"]],
            msg: "Status must be 'co-host', 'member', or 'pending'",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Membership",
      defaultScope: {
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        newMembership: {
          attributes: {
            exclude: ["userId", "groupId", "createdAt", "updatedAt"],
          },
        },
        updatedMembership: {
          attributes: {
            exclude: ["id", "groupId", "createdAt", "updatedAt"],
          },
        },
      },
    }
  );
  return Membership;
};
