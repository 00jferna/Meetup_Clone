const express = require("express");
const {
  Group,
  User,
  Membership,
  Attendance,
  Groupimage,
  EventImage,
  Venue,
  Event,
  Sequelize,
} = require("../../db/models");

const { restoreUser, requireAuth } = require("../../utils/auth");

const router = express.Router();

const returnMsg = {};

let schema;
if (process.env.NODE_ENV === "production") {
  schema = process.env.SCHEMA; // define your schema in options object
}

// Get all Groups
router.get("/", async (req, res) => {
  const groups = await Group.findAll({
    attributes: [
      "id",
      "organizerId",
      "name",
      "about",
      "type",
      "private",
      "city",
      "state",
      "createdAt",
      "updatedAt",
      [Sequelize.fn("COUNT", Sequelize.col("Memberships.id")), "numMembers"],
      [Sequelize.col("Groupimages.url"), "previewImage"],
    ],
    include: [
      { model: Membership, attributes: [] },
      { model: Groupimage, attributes: [] },
    ],
    group: ["Group.id", "Groupimages.url"],
  });

  return res.status(200).json({ Groups: groups });
});

// Get all Groups joined or organized by the Current User
router.get("/current", restoreUser, requireAuth, async (req, res) => {
  const organizerId = req.user.id;
  const userGroups = await User.findByPk(organizerId, {
    attributes: [],
    include: [
      {
        model: Group,
        attributes: [
          "id",
          "name",
          "city",
          "state",
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM ${schema ? `"${schema}"."Memberships"` : "Memberships"}
              AS "Membership"
              WHERE
                "Membership"."groupId" = "Groups"."id"
              GROUP BY "Membership"."groupId"
              )`),
            "numMembers",
          ],
          [
            Sequelize.literal(`(
              SELECT url
              FROM ${schema ? `"${schema}"."Groupimages"` : "Groupimages"}
              AS "Groupimage"
              WHERE
                  "Groupimage"."preview" = true
                AND
                  "Groupimage"."groupId" = "Groups"."id"
              GROUP BY "Groupimage"."url"
              )`),
            "previewImage",
          ],
        ],
        include: { model: Membership, attributes: [] },
      },
    ],
  });

  return res.status(200).json(userGroups);
});

// Get details of a Group from an id
router.get("/:groupId", async (req, res) => {
  const id = req.params.groupId;
  const groups = await Group.findByPk(id,{
    attributes: [
      "id",
      "organizerId",
      "name",
      "about",
      "type",
      "private",
      "city",
      "state",
      "createdAt",
      "updatedAt",
      [
        Sequelize.literal(`(
            SELECT COUNT(*)
            FROM ${schema ? `"${schema}"."Memberships"` : "Memberships"}
            AS "Membership"
            WHERE
              "Membership"."groupId" = "Group"."id"
            GROUP BY "Membership"."id"
        )`),
        "numMembers",
      ],
    ],
    include: [
      { model: Membership, attributes: [] },
      {
        model: User,
        as: "Organizer",
        attributes: ["id", "firstName", "lastName"],
      },
      { model: Groupimage, attributes: ["id", "url", "preview"] },
      {
        model: Venue,
        as: "Venues",
      },
    ],
    group: [
      "Group.id",
      "Organizer.id",
      "Groupimages.id",
      "Groupimages.url",
      "Groupimages.preview",
      "Venues.id",
    ],
  });
  if (groups.id) {
    return res.status(200).json(groups);
  } else {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
});

// Get all Events of a Group specified by its id
router.get("/:groupId/events", async (req, res) => {
  const groupId = req.params.groupId;

  const group = await Group.findByPk(groupId);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }

  const events = await Event.findAll({
    where: {
      groupId,
    },
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
            GROUP BY "Attendance"."eventId"
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
        include: [
          {
            model: Groupimage,
            where: {
              preview: true,
            },
            attributes: [],
          },
        ],
      },
      {
        model: Venue,
        as: "Venue",
        attributes: ["id", "city", "state"],
      },
      { model: Attendance, attributes: [] },
    ],
    group: ["Event.id", "Group.id", "Venue.id", "Group.Groupimages.url"],
  });

  if (events) {
    return res.status(200).json({ Events: events });
  } else {
    returnMsg.message = `There are no Events for ${group.name}`;
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
});

// Create a Group
router.post("/", restoreUser, requireAuth, async (req, res) => {
  const { name, about, type, private, city, state } = req.body;
  const organizerId = req.user.id;
  const group = await Group.create({
    organizerId,
    name,
    about,
    type,
    private,
    city,
    state,
  });

  await Membership.create({
    status: "co-host",
    userId: organizerId,
    groupId: group.id,
  });
  const newGroup = await Group.scope("newGroup").findByPk(group.id);
  return res.status(201).json(newGroup);
});

// Add an Image to a Group based on the Group's id
router.post("/:groupId/images", restoreUser, requireAuth, async (req, res) => {
  const id = req.params.groupId;
  const userId = req.user.id;
  const { url, preview } = req.body;

  const group = await Group.findByPk(id);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  if (userId === group.organizerId) {
    const createdImg = await Groupimage.create({
      url,
      groupId: id,
      preview,
    });

    const newImg = await Groupimage.scope("newImage").findByPk(createdImg.id);
    if (newImg.id) {
      return res.status(200).json(newImg);
    }
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

// Edit a Group
router.put("/:groupId", restoreUser, requireAuth, async (req, res) => {
  const id = req.params.groupId;
  const userId = req.user.id;
  const { name, about, type, private, city, state } = req.body;
  const group = await Group.findByPk(id);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  if (userId === group.organizerId) {
    const updates = await group.update({
      name,
      about,
      type,
      private,
      city,
      state,
    });
    const updatedGroup = await Group.scope("updatedGroup").findByPk(updates.id);
    return res.status(200).json(updatedGroup);
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

// Delete a Group
router.delete("/:groupId", restoreUser, requireAuth, async (req, res) => {
  const id = req.params.groupId;
  const userId = req.user.id;
  const { name, about, type, private, city, state } = req.body;
  const group = await Group.findByPk(id);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  if (userId === group.organizerId) {
    const deleted = await group.destroy();
    returnMsg.message = "Successfully deleted";
    returnMsg.statusCode = 200;
    return res.status(200).json(returnMsg);
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

// Get All Venues for a Group specified by its id
router.get("/:groupId/venues", restoreUser, requireAuth, async (req, res) => {
  const id = req.params.groupId;
  const userId = req.user.id;

  const group = await Group.findByPk(id);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  const user = await Membership.findOne({
    where: {
      userId,
      groupId: id,
    },
  });

  if (user.status === "co-host" || group.organizerId === userId) {
    const venues = await Venue.findAll({
      where: { groupId: id },
    });
    return res.status(200).json({ Venues: venues });
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

// Create a new Venue for a Group specified by its id
router.post("/:groupId/venues", restoreUser, requireAuth, async (req, res) => {
  const id = req.params.groupId;
  const userId = req.user.id;
  const { address, city, state, lat, lng } = req.body;

  const group = await Group.findByPk(id);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  const user = await Membership.findOne({
    where: {
      userId,
      groupId: id,
    },
  });

  if (user.status === "co-host" || group.organizerId === userId) {
    const createdVenue = await Venue.create({
      groupId: id,
      address,
      city,
      state,
      lat,
      lng,
    });

    const newVenue = await Venue.scope("newVenue").findByPk(createdVenue.id);
    if (newVenue) {
      return res.status(200).json(newVenue);
    }
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

//Create an Event for a Group specified by its id
router.post("/:groupId/events", restoreUser, requireAuth, async (req, res) => {
  const id = req.params.groupId;
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

  const group = await Group.findByPk(id);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  if (userId === group.organizerId) {
    const createdEvent = await Event.create({
      groupId: id,
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    });

    const newEvent = await Event.scope("newEvent").findByPk(createdEvent.id);
    if (newEvent) {
      return res.status(200).json(newEvent);
    }
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

//Get all Members of a Group specified by its id
router.get("/:groupId/members", restoreUser, requireAuth, async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.user.id;

  const group = await Group.findByPk(groupId);

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
    const memberList = await User.findAll({
      include: {
        model: Membership,
        where: { groupId },
        attributes: ["status"],
      },
    });
    return res.status(200).json({ Members: memberList });
  } else if (user) {
    const memberList = await User.findAll({
      include: {
        model: Membership,
        where: { groupId },
        attributes: ["status"],
      },
    });
    return res.status(200).json({ Members: memberList });
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

//Request a Membership for a Group based on the Group's id
router.post(
  "/:groupId/membership",
  restoreUser,
  requireAuth,
  async (req, res) => {
    const groupId = req.params.groupId;
    const userId = req.user.id;

    const group = await Group.findByPk(groupId);

    if (!group) {
      returnMsg.message = "Group couldn't be found";
      returnMsg.statusCode = 404;
      return res.status(404).json(returnMsg);
    }

    const currentMembeship = await Membership.findOne({
      where: {
        userId,
        groupId,
      },
    });

    if (!currentMembeship) {
      const createdMembership = await Membership.create({
        userId,
        groupId,
        status: "pending",
      });

      const newMembership = await Membership.scope("newMembership").findByPk(
        createdMembership.id
      );
      if (newMembership) {
        return res.status(200).json(newMembership);
      }
    } else if (currentMembeship.status === "pending") {
      returnMsg.message = "Membership has already been requested";
      returnMsg.statusCode = 400;
      return res.status(403).json(returnMsg);
    } else if (currentMembeship.status === "member") {
      returnMsg.message = "User is already a member of the group";
      returnMsg.statusCode = 400;
      return res.status(403).json(returnMsg);
    }
  }
);

//Change the status of a membership for a group specified by id
router.put(
  "/:groupId/membership",
  restoreUser,
  requireAuth,
  async (req, res) => {
    const groupId = req.params.groupId;
    const userId = req.user.id;
    const { memberId, status } = req.body;
    const group = await Group.findByPk(groupId);

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
    const member = await Membership.findOne({
      where: {
        userId: memberId,
        groupId,
      },
    });

    if (!member) {
      returnMsg.message =
        "Membership between the user and the group does not exist";
      returnMsg.statusCode = 404;
      return res.status(403).json(returnMsg);
    }
    console.log(member, userId, user.status);
    if (
      member.status === "pending" &&
      (user.status === "co-host" || userId === group.organizerId)
    ) {
      await member.update({
        status,
      });
      const updatedMember = await Membership.scope(
        "updatedMembership"
      ).findByPk(member.id);

      return res.status(200).json(updatedMember);
    } else if (member.status === "member" && userId === group.organizerId) {
      await member.update({
        status,
      });
      const updatedMember = await Membership.scope(
        "updatedMembership"
      ).findByPk(member.id);

      return res.status(200).json(updatedMember);
    } else {
      returnMsg.message = "Forbidden";
      returnMsg.statusCode = 403;
      return res.status(403).json(returnMsg);
    }
  }
);

//Delete membership to a group specified by id
router.delete(
  "/:groupId/membership",
  restoreUser,
  requireAuth,
  async (req, res) => {
    const groupId = req.params.groupId;
    const userId = req.user.id;
    const { memberId } = req.body;
    const group = await Group.findByPk(groupId);

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
    const member = await Membership.findOne({
      where: {
        userId: memberId,
        groupId,
      },
    });

    if (!member) {
      returnMsg.message = "Membership does not exist for this User";
      returnMsg.statusCode = 404;
      return res.status(403).json(returnMsg);
    }

    if (
      member.id === user.id ||
      user.status === "co-host" ||
      userId === group.organizerId
    ) {
      await member.destroy();

      returnMsg.message = "Successfully deleted membership from group";
      return res.status(403).json(returnMsg);
    } else {
      returnMsg.message = "Forbidden";
      returnMsg.statusCode = 403;
      return res.status(403).json(returnMsg);
    }
  }
);

module.exports = router;
