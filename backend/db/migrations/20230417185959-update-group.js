"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Groups";
    return queryInterface.changeColumn(options, "about", {
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Groups";
    return queryInterface.changeColumn(options, "about", {
      type: Sequelize.STRING,
    });
  },
};
