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
          userId: 2,
          eventId: 1,
        },
        {
          status: "waitlist",
          userId: 3,
          eventId: 1,
        },
        {
          status: "pending",
          userId: 4,
          eventId: 1,
        },
        {
          status: "member",
          userId: 2,
          eventId: 2,
        },
        {
          status: "waitlist",
          userId: 3,
          eventId: 2,
        },
        {
          status: "pending",
          userId: 4,
          eventId: 2,
        },
        {
          status: "member",
          userId: 2,
          eventId: 3,
        },
        {
          status: "waitlist",
          userId: 3,
          eventId: 3,
        },
        {
          status: "pending",
          userId: 4,
          eventId: 3,
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
        eventId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
