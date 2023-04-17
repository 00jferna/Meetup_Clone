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
          url: "/assets/eventImages/pexels-md-iftekhar-uddin-emon-403495.jpg",
          eventId: 1,
          preview: true,
        },
        {
          url: "/assets/eventImages/pexels-vasilis-karkalas-11206422.jpg",
          eventId: 2,
          preview: true,
        },
        {
          url: "/assets/eventImages/pexels-md-iftekhar-uddin-emon-403495.jpg",
          eventId: 3,
          preview: true,
        },
        {
          url: "/assets/eventImages/pexels-giorgio-de-angelis-1413412.jpg",
          eventId: 4,
          preview: true,
        },
        {
          url: "/assets/eventImages/pexels-vojta-3243090.jpg",
          eventId: 7,
          preview: true,
        },
        {
          url: "/assets/eventImages/pexels-vojta-3243090.jpg",
          eventId: 8,
          preview: true,
        },
        {
          url: "/assets/eventImages/pexels-pixabay-236973.jpg",
          eventId: 9,
          preview: true,
        },
        {
          url: "/assets/eventImages/78b251be-a66c-42f0-9297-2aec647d82fd-ofEPqjFA.jpg",
          eventId: 10,
          preview: true,
        },
        {
          url: "/assets/eventImages/pexels-pixabay-236973.jpg",
          eventId: 11,
          preview: true,
        },
        {
          url: "/assets/eventImages/pexels-magda-ehlers-1189257.jpg",
          eventId: 12,
          preview: true,
        },
        {
          url: "/assets/eventImages/pexels-cottonbro-studio-4065876.jpg",
          eventId: 13,
          preview: true,
        },
        {
          url: "/assets/eventImages/pexels-fauxels-3184328.jpg",
          eventId: 14,
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
        eventId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
      },
      {}
    );
  },
};
