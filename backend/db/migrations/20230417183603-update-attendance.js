"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Attendances";
    return queryInterface.changeColumn(options, "status", {
      type: Sequelize.ENUM("member", "waitlist", "pending"),
    });
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Attendances";
    return queryInterface.changeColumn(options, "status", {
      type: Sequelize.ENUM("attending", "waitlist", "pending"),
    });
  },
};
