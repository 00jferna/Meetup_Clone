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
          url: "/assets/groupImages/pexels-david-bartus-610293.jpg",
          groupId: 1,
          preview: true,
        },
        {
          url: "/assets/groupImages/pexels-fox-750841.jpg",
          groupId: 2,
          preview: false,
        },
        {
          url: "/assets/groupImagespexels-riccardo-307008.jpg",
          groupId: 3,
          preview: true,
        },
        {
          url: "/assets/groupImages/pexels-xue-guangjian-1687845.jpg",
          groupId: 4,
          preview: true,
        },
        {
          url: "/assets/groupImages/pexels-fauxels-3184183.jpg",
          groupId: 5,
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
        groupId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
