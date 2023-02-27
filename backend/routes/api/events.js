const express = require("express");
const {
  Group,
  User,
  Membership,
  Groupimage,
  EventImage,
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
      "groupId",
      "venueId",
      "name",
      "type",
      "startDate",
      "endDate",
      [
        Sequelize.literal(`(
            SELECT "COUNT(*)"
            FROM "meetup_clone"."Attendances"
            WHERE
              "Attendances"."eventId" = "Event"."id"
        )`),
        "numAttending",
      ],
      [
        Sequelize.literal(`(
            SELECT url
            FROM "meetup_clone"."EventImages"
            WHERE
                "EventImages"."preview" = true
                AND
                "EventImages"."eventId" = "Event"."id"
        )`),
        "previewImage",
      ],
    ],
    include: [
      {
        model: Group,
        as: "Group",
        attributes: ["id", "name", "city", "state"],
        include: {
          model: Event,
          attributes: [],
          include: [{ model: EventImage, attributes: [] }],
        },
      },
      { model: Attendance, attributes: [] },
      {
        model: Venue,
        as: "Venue",
        attributes: ["id", "city", "state"],
      },
    ],
    group: ["Event.id", "Venue.id", "Attendances.id", "Group.id"],
  });

  return res.status(200).json({ Events: events });
});

// Get all Events
router.get("/:eventId", async (req, res) => {
  const id = req.params.eventId;

  const events = await Event.findByPk(id, {
    attributes: [
      "id",
      "groupId",
      "venueId",
      "name",
      "description",
      "type",
      "capacity",
      "price",
      "startDate",
      "endDate",
      [
        Sequelize.literal(`(
            SELECT COUNT(*)
            FROM Attendances
            WHERE
                Attendances.eventId = Event.id
        )`),
        "numAttending",
      ],
    ],
    include: [
      {
        model: Group,
        as: "Group",
        attributes: ["id", "name", "city", "state"],
      },
      { model: EventImage },
      {
        model: Venue,
        as: "Venue",
        attributes: ["id", "city", "state"],
      },
      { model: Attendance, attributes: [] },
    ],
    group: ["Event.id", "Group.id", "Venue.id", "EventImages.id"],
  });

  return res.status(200).json(events);
});

module.exports = router;
