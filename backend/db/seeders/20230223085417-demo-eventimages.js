"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "EventImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          url: "eventPic001.jpg",
          eventId: 7,
          preview: true,
        },
        {
          url: "eventPic002.jpg",
          eventId: 7,
          preview: false,
        },
        {
          url: "eventpic003.jpg",
          eventId: 7,
          preview: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "EventImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        eventId: { [Op.in]: [1, 2, 3, 7] },
      },
      {}
    );
  },
};
