"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          id: 1,
          email: "demo@user.io",
          username: "Demo-lition",
          firstName: "Demo",
          lastName: "User",
          hashedPassword: bcrypt.hashSync("demo-password"),
        },
        {
          id: 2,
          email: "Clark@user.io",
          username: "ClarkA",
          firstName: "Clark",
          lastName: "Adams",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          id: 3,
          email: "John@user.io",
          username: "JohnS",
          firstName: "John",
          lastName: "Smith",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          id: 4,
          email: "Jane@user.io",
          username: "JaneD",
          firstName: "Jane",
          lastName: "Doe",
          hashedPassword: bcrypt.hashSync("password2"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "ClarkA", "JohnS", "JaneD"] },
      },
      {}
    );
  },
};
