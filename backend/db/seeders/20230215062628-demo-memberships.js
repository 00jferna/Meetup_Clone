"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Memberships";
    return queryInterface.bulkInsert(
      options,
      [
        {
          status: "co-host",
          userId: 2,
          groupId: 1,
        },
        {
          status: "member",
          userId: 3,
          groupId: 1,
        },
        {
          status: "pending",
          userId: 4,
          groupId: 1,
        },
        {
          status: "co-host",
          userId: 2,
          groupId: 2,
        },
        {
          status: "member",
          userId: 3,
          groupId: 2,
        },
        {
          status: "pending",
          userId: 4,
          groupId: 2,
        },
        {
          status: "co-host",
          userId: 2,
          groupId: 3,
        },
        {
          status: "member",
          userId: 3,
          groupId: 3,
        },
        {
          status: "pending",
          userId: 4,
          groupId: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Memberships";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [2, 3, 4] },
      },
      {}
    );
  },
};
