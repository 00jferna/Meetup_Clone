"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Groupimages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          url: "../../../frontend/assets/pic001.jpg",
          groupId: 1,
          preview: true,
        },
        {
          url: "../../../frontend/assets/pic002.jpg",
          groupId: 2,
          preview: false,
        },
        {
          url: "../../../frontend/assets/pic003.jpg",
          groupId: 3,
          preview: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Groupimages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        groupId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
