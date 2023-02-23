const express = require("express");
const {
  Group,
  User,
  Membership,
  Groupimage,
  Venue,
  Event,
  Sequelize,
} = require("../../db/models");

const { restoreUser, requireAuth } = require("../../utils/auth");

const router = express.Router();

const returnMsg = {};

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

  return res.status(200).json(groups);
});

// Get all Groups joined or organized by the Current User
router.get("/current", restoreUser, requireAuth, async (req, res) => {
  const organizerId = req.user.id;
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
      { model: Membership, where: { userId: organizerId }, attributes: [] },
      { model: Groupimage, attributes: [] },
    ],
    group: ["Group.id", "Groupimages.url"],
  });

  return res.status(200).json(groups);
});

// Get details of a Group from an id
router.get("/:groupId", async (req, res) => {
  const id = req.params.groupId;
  const groups = await Group.findOne({
    where: { id },
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
        model: Event,
        attributes: [],
        include: [{ model: Venue, as: "Venues", attributes: [] }],
      },
    ],
    group: [
      "Group.id",
      "Organizer.id",
      "Groupimages.id",
      "Groupimages.url",
      "Groupimages.preview",
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
  const id = req.params.groupId;
  const groups = await Group.findOne();

  if (groups.id) {
    return res.status(200).json(groups);
  } else {
    returnMsg.message = "Group couldn't be found";
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

  return res.status(201).json(group);
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
    if (newImg) {
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

    return res.status(200).json(updates);
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

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  if (userId) {
    const venues = await Venue.findAll({
      where: { groupId: id },
    });
    return res.status(200).json(venues);
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
  if (userId === group.organizerId) {
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

    const newEvent = await Event.findByPk(createdEvent.id);
    if (newEvent) {
      return res.status(200).json(newEvent);
    }
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

module.exports = router;
