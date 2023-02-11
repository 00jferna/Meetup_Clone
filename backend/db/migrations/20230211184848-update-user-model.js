"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "firstName", {
      type: Sequelize.STRING(30),
    });
    await queryInterface.addColumn(
      "Users",
      "lastName",
      {
        type: Sequelize.STRING(30),
      },
      options
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "firstName");

    await queryInterface.removeColumn("Users", "lastName");
  },
};
