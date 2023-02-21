"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Events";
    return queryInterface.bulkInsert(
      options,
      [
        {
          groupid: 1,
          venueid: 1,
          name: "group1event1",
          description: "This event is for group1",
          type: "Online",
          capacity: 12,
          price: 15.0,
          startDate: "2023-05-01 13:00:00",
          endDate: "2023-05-01 15:00:00",
        },
        {
          groupid: 2,
          venueid: 1,
          name: "group1event1",
          description: "This event is for group2",
          type: "In person",
          capacity: 20,
          price: 12.0,
          startDate: "2023-05-05 13:00:00",
          endDate: "2023-05-05 15:00:00",
        },
        {
          groupid: 3,
          venueid: 1,
          name: "group1event1",
          description: "This event is for group3",
          type: "In person",
          capacity: 25,
          price: 10.0,
          startDate: "2023-04-05 13:00:00",
          endDate: "2023-04-05 15:00:00",
        },
        {
          groupid: 1,
          venueid: 1,
          name: "group2event1",
          description: "This event is for group1",
          type: "Online",
          capacity: 12,
          price: 15.0,
          startDate: "2023-07-01 13:00:00",
          endDate: "2023-07-01 15:00:00",
        },
        {
          groupid: 2,
          venueid: 1,
          name: "group2event1",
          description: "This event is for group2",
          type: "In person",
          capacity: 20,
          price: 12.0,
          startDate: "2023-07-05 13:00:00",
          endDate: "2023-07-05 15:00:00",
        },
        {
          groupid: 3,
          venueid: 1,
          name: "group2event1",
          description: "This event is for group3",
          type: "In person",
          capacity: 25,
          price: 10.0,
          startDate: "2023-06-05 13:00:00",
          endDate: "2023-06-05 15:00:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Events";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        groupid: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
