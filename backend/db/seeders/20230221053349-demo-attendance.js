"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Attendances";
    return queryInterface.bulkInsert(
      options,
      [
        {
          status: "member",
          userid: 2,
          eventid: 1,
        },
        {
          status: "waitlist",
          userid: 3,
          eventid: 1,
        },
        {
          status: "pending",
          userid: 4,
          eventid: 1,
        },
        {
          status: "member",
          userid: 2,
          eventid: 2,
        },
        {
          status: "waitlist",
          userid: 3,
          eventid: 2,
        },
        {
          status: "pending",
          userid: 4,
          eventid: 2,
        },
        {
          status: "member",
          userid: 2,
          eventid: 3,
        },
        {
          status: "waitlist",
          userid: 3,
          eventid: 3,
        },
        {
          status: "pending",
          userid: 4,
          eventid: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Attendances";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        eventid: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
