"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Memberships";
    await queryInterface.changeColumn(options, "groupId", {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Memberships";
    await queryInterface.changeColumn(options, "groupId", {
      type: Sequelize.STRING(30),
    });
  },
};
