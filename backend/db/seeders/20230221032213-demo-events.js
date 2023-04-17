"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Events";
    return queryInterface.bulkInsert(
      options,
      [
        {
          groupId: 1,
          venueId: 1,
          name: "Photography WorkShop - Beginner",
          description:
            "Discover the world of photography with our online workshop for beginners. Led by experienced photographers, this workshop will cover the fundamentals of composition, exposure, and lighting. Learn how to take your camera off auto mode and start capturing stunning photos. With personalized feedback and interactive sessions, you'll have the opportunity to ask questions and get real-time guidance. Join our community of photography enthusiasts and elevate your skills today!",
          type: "Online",
          capacity: 20,
          price: 25.0,
          startDate: "2023-04-15 13:00:00",
          endDate: "2023-04-15 15:00:00",
          previewImage:""
        },
        {
          groupId: 1,
          venueId: 1,
          name: "Photography WorkShop - Landscape",
          description:
            "Join our landscape photography workshop and explore the beauty of Memphis through your lens. Led by experienced photographers, this workshop will take you to the most photogenic locations in the city, from iconic landmarks to hidden gems. Learn the essential techniques for capturing stunning landscape photographs, including exposure, lighting, and composition. With personalized feedback and interactive sessions, you'll have the opportunity to enhance your skills and get real-time guidance. Meet fellow photography enthusiasts and capture the essence of Memphis like never before. Don't miss out on this unforgettable experience!",
          type: "In person",
          capacity: 10,
          price: 50,
          startDate: "2023-04-19 17:00:00",
          endDate: "2023-04-19 19:00:00",
        },
        {
          groupId: 1,
          venueId: 1,
          name: "Photography WorkShop - Beginner",
          description:
            "Discover the world of photography with our online workshop for beginners. Led by experienced photographers, this workshop will cover the fundamentals of composition, exposure, and lighting. Learn how to take your camera off auto mode and start capturing stunning photos. With personalized feedback and interactive sessions, you'll have the opportunity to ask questions and get real-time guidance. Join our community of photography enthusiasts and elevate your skills today!",
          type: "Online",
          capacity: 20,
          price: 25.0,
          startDate: "2023-04-29 13:00:00",
          endDate: "2023-04-29 15:00:00",
        },
        {
          groupId: 2,
          venueId: 1,
          name: "Sunday Cruise - West TN",
          description:
            "Join our Sunday Cruise motorbike tour in West TN and experience the thrill of cruising down scenic roads. Led by experienced riders, this tour will take you to some of the most breathtaking locations in the area, from picturesque small towns to rolling hills and countryside. Whether you're a seasoned rider or just starting out, this tour is perfect for you. Meet fellow riders, make new friends, and enjoy the freedom of the open road. Join us for an unforgettable adventure on two wheels!",
          type: "In person",
          capacity: 10,
          price: 0,
          startDate: "2023-03-19 09:00:00",
          endDate: "2023-03-19 13:00:00",
        },
        {
          groupId: 2,
          venueId: 1,
          name: "Online Townhall",
          description:
            "Join our motorbike tour group's online town hall to connect with fellow riders and discuss all things motorcycles. This virtual gathering is a great opportunity to share your passion, ask questions, and connect with like-minded individuals. Whether you're a seasoned rider or just starting out, we welcome all motorcycle enthusiasts to join us. From tips on maintenance to recommendations for great rides, this town hall is sure to be an informative and fun event. Join us online and be part of our vibrant motorcycle community!",
          type: "Online",
          capacity: 10,
          price: 0,
          startDate: "2023-03-24 19:00:00",
          endDate: "2023-03-24 22:00:00",
        },
        {
          groupId: 2,
          venueId: 1,
          name: "Online Townhall",
          description:
            "Join our motorbike tour group's online town hall to connect with fellow riders and discuss all things motorcycles. This virtual gathering is a great opportunity to share your passion, ask questions, and connect with like-minded individuals. Whether you're a seasoned rider or just starting out, we welcome all motorcycle enthusiasts to join us. From tips on maintenance to recommendations for great rides, this town hall is sure to be an informative and fun event. Join us online and be part of our vibrant motorcycle community!",
          type: "Online",
          capacity: 10,
          price: 0,
          startDate: "2023-04-28 19:00:00",
          endDate: "2023-04-28 22:00:00",
        },
        {
          groupId: 3,
          venueId: 1,
          name: "Quarterly Planning Meeting",
          description:
            "Join our International Travelers group for our Quarterly Planning Meeting and help shape our upcoming travel adventures!",
          type: "Online",
          capacity: 100,
          price: 0,
          startDate: "2023-03-05 09:00:00",
          endDate: "2023-03-05 13:00:00",
        },
        {
          groupId: 3,
          venueId: 1,
          name: "Quarterly Planning Meeting",
          description:
            "Join our International Travelers group for our Quarterly Planning Meeting and help shape our upcoming travel adventures!",
          type: "Online",
          capacity: 100,
          price: 0,
          startDate: "2023-06-11 09:00:00",
          endDate: "2023-06-11 13:00:00",
        },
        {
          groupId: 4,
          venueId: 1,
          name: "Wolf River Day Hike - Memphis, TN",
          description:
            "Join us for a day hike in one of Memphis TN's beautiful parks. Explore nature, breathe in the fresh air, and get some exercise while enjoying the company of like-minded individuals. Led by experienced guides, this hike will take you through the most scenic areas of the park, from lush forests to tranquil streams. Whether you're a seasoned hiker or just starting out, this is a perfect opportunity to get outside and connect with nature. Join us for an unforgettable day in the great outdoors!",
          type: "In person",
          capacity: 10,
          price: 0,
          startDate: "2023-03-05 09:00:00",
          endDate: "2023-03-05 13:00:00",
        },
        {
          groupId: 4,
          venueId: 1,
          name: "Demo Day - REI, Memphis, TN",
          description:
            "Join us for our backpacking equipment demo day at REI and discover the latest gear and technology for your next adventure. Our expert staff will be on hand to guide you through the latest equipment and offer tips and tricks for optimizing your backpacking experience. Try out new backpacks, sleeping bags, and other essential gear, and get personalized advice from our knowledgeable team. Whether you're a seasoned backpacker or just starting out, this is a perfect opportunity to learn about the latest gear and enhance your outdoor experience.",
          type: "In person",
          capacity: 30,
          price: 0,
          startDate: "2023-04-26 13:00:00",
          endDate: "2023-04-26 15:00:00",
        },
        {
          groupId: 4,
          venueId: 1,
          name: "Island Loop Trial Day Hike - Pickwick Dam, TN",
          description:
            "Join us for a day hike in one of Memphis TN's beautiful parks. Explore nature, breathe in the fresh air, and get some exercise while enjoying the company of like-minded individuals. Led by experienced guides, this hike will take you through the most scenic areas of the park, from lush forests to tranquil streams. Whether you're a seasoned hiker or just starting out, this is a perfect opportunity to get outside and connect with nature. Join us for an unforgettable day in the great outdoors!",
          type: "In person",
          capacity: 10,
          price: 0,
          startDate: "2023-04-22 09:00:00",
          endDate: "2023-04-22 13:00:00",
        },

        {
          groupId: 5,
          venueId: 1,
          name: "Network Now: Happy Hour",
          description:
            "Join Professionals of Nashville for a fun and engaging happy hour networking event! Connect with like-minded professionals, exchange ideas, and make meaningful connections that can help advance your career. Enjoy drinks and appetizers in a relaxed atmosphere while you expand your professional network. Whether you're looking to make new connections or catch up with old ones, this is the perfect event for you. Don't miss out on this great opportunity to grow your network and have a good time with colleagues!",
          type: "In person",
          capacity: 15,
          price: 0,
          startDate: "2023-03-07 17:00:00",
          endDate: "2023-03-07 20:00:00",
        },
        {
          groupId: 5,
          venueId: 1,
          name: "Making Connections",
          description:
            "Join Professionals of Nashville for an online workshop on networking and how to leverage your connections to advance your career. Our experienced presenters will share valuable insights and tips on how to network effectively and build meaningful professional relationships. Whether you're just starting out or looking to enhance your existing network, this workshop is for you. You'll learn how to make the most of networking opportunities and leverage your connections to achieve your career goals. Don't miss out on this valuable opportunity to improve your networking skills!",
          type: "Online",
          capacity: 30,
          price: 0,
          startDate: "2023-04-26 13:00:00",
          endDate: "2023-04-26 15:00:00",
        },
        {
          groupId: 5,
          venueId: 1,
          name: "Lunch & Learn",
          description:
            "Our experienced presenters will share insights on how to network effectively and leverage your connections to advance your career. Enjoy a delicious lunch while you expand your professional network and gain valuable knowledge that will help you achieve your career goals. Whether you're just starting out or looking to enhance your existing network, this workshop is for you.",
          type: "In person",
          capacity: 40,
          price: 50,
          startDate: "2023-05-16 11:00:00",
          endDate: "2023-05-16 13:00:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Events";
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
