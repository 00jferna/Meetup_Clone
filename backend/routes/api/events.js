const express = require("express");
const {
  Group,
  User,
  Membership,
  Groupimage,
  Venue,
  Event,
  Attendance,
  Sequelize,
} = require("../../db/models");

const { restoreUser, requireAuth } = require("../../utils/auth");

const router = express.Router();

const returnMsg = {};

// Get all Events
router.get("/", async (req, res) => {
  const events = await Event.findAll({
    attributes: [
      "id",
      "groupid",
      "venueid",
      "name",
      "type",
      "startDate",
      "endDate",
      [
        Sequelize.fn("COUNT", Sequelize.col("Attendances.userid")),
        "numAttending",
      ],
      [Sequelize.col("Group.Groupimages.url"), "previewImage"],
    ],
    include: [
      {
        model: Group,
        as: "Group",
        attributes: ["id", "name", "city", "state"],
        include: [
          {
            model: Groupimage,
            attributes: [],
          },
        ],
      },
      {
        model: Venue,
      },
      { model: Attendance, attributes: [] },
    ],
    group: ["Event.id","Group.Groupimages.url"],
  });

  return res.status(200).json(events);
});

module.exports = router;
