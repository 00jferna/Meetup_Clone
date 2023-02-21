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
          userid: 2,
          groupid: 1,
        },
        {
          status: "member",
          userid: 3,
          groupid: 1,
        },
        {
          status: "pending",
          userid: 4,
          groupid: 1,
        },
        {
          status: "co-host",
          userid: 2,
          groupid: 2,
        },
        {
          status: "member",
          userid: 3,
          groupid: 2,
        },
        {
          status: "pending",
          userid: 4,
          groupid: 2,
        },
        {
          status: "co-host",
          userid: 2,
          groupid: 3,
        },
        {
          status: "member",
          userid: 3,
          groupid: 3,
        },
        {
          status: "pending",
          userid: 4,
          groupid: 3,
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
        userid: { [Op.in]: [2, 3, 4] },
      },
      {}
    );
  },
};
