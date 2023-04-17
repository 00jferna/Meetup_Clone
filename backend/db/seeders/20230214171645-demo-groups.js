"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Groups";
    return queryInterface.bulkInsert(
      options,
      [
        {
          name: "Memphis Photographers",
          about:
            "Join the Memphis TN Photographers Group to explore and capture the essence of this vibrant city through your lens. We offer photo walks, workshops, and events for photographers of all levels. Let's discover the beauty of Memphis together!",
          type: "In person",
          private: false,
          city: "Memphis",
          state: "TN",
        },
        {
          name: "Motorbike Touring of America",
          about:
            "Join our motorbike touring group and explore the open road with like-minded riders. Experience the thrill of touring while enjoying the beauty of nature. Meet new friends and discover new destinations together. Join us for an adventure on two wheels!",
          type: "Online",
          private: false,
          city: "Dallas",
          state: "TX",
        },
        {
          name: "International Travelers",
          about:
            "Ready to explore the world? Join our international travel group and experience new cultures, food, and people. From exotic destinations to off-the-beaten-path adventures, we offer unforgettable experiences that will broaden your horizons. Discover the world with us!",
          type: "Online",
          private: true,
          city: "New York",
          state: "NY",
        },
        {
          name: "Backpackers of West Tennessee",
          about:
            "The Backpackers of West Tennessee group offers unforgettable outdoor experiences for hiking and camping enthusiasts. Join our community to broaden your horizons, meet new friends, and explore the great outdoors together.",
          type: "In person",
          private: true,
          city: "Memphis",
          state: "TN",
        },
        {
          name: "Professionals of Nashville",
          about:
            "Our Nashville Professionals community is focused on networking and connecting like-minded individuals. Join us for business events, social gatherings, and more to expand your professional and personal circles. Build valuable relationships, grow your career, and make meaningful connections with our community.",
          type: "In person",
          private: true,
          city: "Nashville",
          state: "TN",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Groups";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Memphis Photographers",
            "Motorbike Touring of America",
            "International Travelers",
            "Backpackers of West Tennessee",
            "Professionals of Nashville",
          ],
        },
      },
      {}
    );
  },
};
