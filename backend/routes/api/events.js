const express = require("express");
const {
  Group,
  Event,
  User,
  Membership,
  Groupimage,
  EventImage,
  Venue,
  Attendance,
  Sequelize,
} = require("../../db/models");

const { restoreUser, requireAuth } = require("../../utils/auth");

const router = express.Router();

const returnMsg = {};

let schema;
if (process.env.NODE_ENV === "production") {
  schema = process.env.SCHEMA; // define your schema in options object
}

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
            SELECT COUNT(*)
            FROM ${schema ? `"${schema}"."Attendances"` : "Attendances"}
            AS "Attendance"
            WHERE
              "Attendance"."eventId" = "Event"."id"
            GROUP BY "Attendance.eventId"
        )`),
        "numAttending",
      ],
      [
        Sequelize.literal(`(
            SELECT url
            FROM ${schema ? `"${schema}"."EventImages"` : "EventImages"} 
            AS "EventImage"
            WHERE
                "EventImage"."preview" = true
              AND
                "EventImage"."eventId" = "Event"."id"
            GROUP BY "EventImage"."url"
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

// Get details of an Event specified by its id
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

//Create an Event for a Group specified by its id
router.post("/:groupId/events", restoreUser, requireAuth, async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.user.id;
  const {
    venueId,
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate,
  } = req.body;

  const group = await Event.findByPk(groupId);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  const user = await Membership.findOne({
    where: {
      userId,
      groupId,
    },
  });

  if (user.status === "co-host" || group.organizerId === userId) {
    const createdVenue = await Event.create({
      groupId,
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    });

    const newEvent = await Event.scope("newEvent").findByPk(createdVenue.id);
    if (newEvent) {
      return res.status(200).json(newEvent);
    }
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

// Add an Image to a Event based on the Event's id
router.post("/:eventId/images", restoreUser, requireAuth, async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user.id;
  const { url, preview } = req.body;

  const event = await Event.findByPk(eventId);

  if (!event) {
    returnMsg.message = "Event couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }

  const user = await Membership.findOne({
    where: {
      userId,
      groupId: event.groupId,
    },
  });

  if (user.status === "co-host" || userId === group.organizerId) {
    const createdImg = await EventImage.create({
      url,
      eventId,
      preview,
    });

    const newImg = await EventImage.scope("newImage").findByPk(createdImg.id);
    if (newImg.id) {
      return res.status(200).json(newImg);
    }
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

//Edit an Event specified by its id
router.put("/:eventId", restoreUser, requireAuth, async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user.id;
  const {
    venueId,
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate,
  } = req.body;
  const event = await Event.findByPk(eventId);

  if (!event) {
    returnMsg.message = "Event couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }

  const user = await Membership.findOne({
    where: {
      userId,
      groupId: event.groupId,
    },
  });
  if (user.status === "co-host" || userId === group.organizerId) {
    const updates = await event.update({
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    });
    const updatedEvent = await Event.scope("updatedEvent").findByPk(eventId);
    return res.status(200).json(updatedEvent);
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

// Delete an Event specified by its id
router.delete("/:eventId", restoreUser, requireAuth, async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user.id;
  const event = await Event.findByPk(eventId);

  if (!event) {
    returnMsg.message = "Event couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }

  const group = await Group.findByPk(event.groupId);

  const user = await Membership.findOne({
    where: {
      userId,
      groupId: event.groupId,
    },
  });

  if (user.status === "co-host" || userId === group.organizerId) {
    const deleted = await event.destroy();
    returnMsg.message = "Successfully deleted";
    returnMsg.statusCode = 200;
    return res.status(200).json(returnMsg);
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

//Get all Attendees of an Event specified by its id
router.get(
  "/:eventId/attendees",
  restoreUser,
  requireAuth,
  async (req, res) => {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    const event = await Event.findByPk(eventId);

    if (!event) {
      returnMsg.message = "Event couldn't be found";
      returnMsg.statusCode = 404;
      return res.status(404).json(returnMsg);
    }

    const group = await Group.findByPk(event.groupId);

    const user = await Membership.findOne({
      where: {
        userId,
        groupId: event.groupId,
      },
    });

    if (user.status === "co-host" || group.organizerId === userId) {
      const attendanceList = await Attendance.findAll({
        where: {
          eventId,
        },
      });
      return res.status(200).json({ Attendees: attendanceList });
    } else if (user) {
      const memberList = await User.findAll({
        include: {
          model: Attendance,
          where: { groupId: eventId },
          attributes: ["status"],
        },
      });
      return res.status(200).json({ Members: memberList });
    } else {
      returnMsg.message = "Forbidden";
      returnMsg.statusCode = 403;
      return res.status(403).json(returnMsg);
    }
  }
);

//Request to Attend an Event based on the Event's id
router.post(
  "/:eventId/attendance",
  restoreUser,
  requireAuth,
  async (req, res) => {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    const event = await Event.findByPk(eventId);

    if (!event) {
      returnMsg.message = "Group couldn't be found";
      returnMsg.statusCode = 404;
      return res.status(404).json(returnMsg);
    }

    const currentMembership = await Membership.findOne({
      where: {
        userId,
        groupId: event.groupId,
      },
    });

    if (!currentMembership) {
      returnMsg.message = "Forbidden";
      returnMsg.statusCode = 403;
      return res.status(403).json(returnMsg);
    }

    const currentAttendance = await Attendance.findOne({
      where: {
        userId,
        eventId,
      },
    });

    if (!currentAttendance) {
      const createdAttendance = await Attendance.create({
        status: "pending",
        userId,
        eventId,
      });

      const newAttendance = await Attendance.scope("newAttendance").findByPk(
        createdAttendance.id
      );
      if (newAttendance) {
        return res.status(200).json(newAttendance);
      }
    } else if (currentAttendance.status === "pending") {
      returnMsg.message = "Attendance has already been requested";
      returnMsg.statusCode = 400;
      return res.status(403).json(returnMsg);
    } else if (currentAttendance.status === "attending") {
      returnMsg.message = "User is already an attendee of the event";
      returnMsg.statusCode = 400;
      return res.status(403).json(returnMsg);
    }
  }
);

//Change the status of an attendance for an event specified by id
router.put(
  "/:eventId/attendance",
  restoreUser,
  requireAuth,
  async (req, res) => {
    const eventId = req.params.eventId;
    const user_Id = req.user.id;
    const { userId, status } = req.body;
    const event = await Event.findByPk(eventId);

    if (!event) {
      returnMsg.message = "Event couldn't be found";
      returnMsg.statusCode = 404;
      return res.status(404).json(returnMsg);
    }

    const group = await Group.findByPk(event.groupId);

    const user = await Membership.findOne({
      where: {
        userId: user_Id,
        groupId: event.groupId,
      },
    });
    const member = await Attendance.findOne({
      where: {
        userId,
        eventId,
      },
    });
    console.log(member, userId);
    if (!member) {
      returnMsg.message =
        "Attendance between the user and the event does not exist";
      returnMsg.statusCode = 404;
      return res.status(403).json(returnMsg);
    }
    console.log(member, user_Id, user.status);
    if (
      member.status === "pending" &&
      (user.status === "co-host" || user_Id === group.organizerId)
    ) {
      await member.update({
        status,
      });
      const updatedAttendance = await Attendance.scope(
        "updatedAttendance"
      ).findByPk(member.id);

      return res.status(200).json(updatedAttendance);
    } else if (status === "pending") {
      returnMsg.message = "Cannot change an attendance status to pending";
      returnMsg.statusCode = 400;
      return res.status(400).json(returnMsg);
    } else {
      returnMsg.message = "Forbidden";
      returnMsg.statusCode = 403;
      return res.status(403).json(returnMsg);
    }
  }
);

//Delete attendance to an event specified by id
router.delete(
  "/:eventId/attendance",
  restoreUser,
  requireAuth,
  async (req, res) => {
    const eventId = req.params.eventId;
    const user_Id = req.user.id;
    const { memberId } = req.body;
    const event = await Event.findByPk(eventId);

    if (!event) {
      returnMsg.message = "Event couldn't be found";
      returnMsg.statusCode = 404;
      return res.status(404).json(returnMsg);
    }
    const group = await Group.findByPk(event.groupId);

    const user = await Membership.findOne({
      where: {
        userId: user_Id,
        groupId: event.groupId,
      },
    });
    const member = await Attendance.findOne({
      where: {
        userId: memberId,
        eventId,
      },
    });

    if (!member) {
      returnMsg.message = "Attendance does not exist for this User";
      returnMsg.statusCode = 404;
      return res.status(403).json(returnMsg);
    }

    if (
      member.id === user.id ||
      user.status === "co-host" ||
      user_Id === group.organizerId
    ) {
      await member.destroy();

      returnMsg.message = "Successfully deleted attendance from event";
      return res.status(403).json(returnMsg);
    } else {
      returnMsg.message = "Forbidden";
      returnMsg.statusCode = 403;
      return res.status(403).json(returnMsg);
    }
  }
);

module.exports = router;
