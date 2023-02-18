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
const membership = require("../../db/models/membership");
const { restoreUser, requireAuth } = require("../../utils/auth");

const router = express.Router();

const returnMsg = {};

// Get all Groups
router.get("/", async (req, res) => {
  const groups = await Group.findAll({
    attributes: [
      "id",
      "organizerid",
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
    group: ["Group.id"],
  });

  return res.status(200).json(groups);
});

// Get all Groups joined or organized by the Current User
router.get("/current", restoreUser, requireAuth, async (req, res) => {
  const organizerid = req.user.id;
  const groups = await Group.findAll({
    attributes: [
      "id",
      "organizerid",
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
      { model: Membership, where: { userid: organizerid }, attributes: [] },
      { model: Groupimage, attributes: [] },
    ],
    group: ["Group.id"],
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
      "organizerid",
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
      { model: Groupimage },
      { model: Event, include: [{ model: Venue }] },
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

// Create a Group
router.post("/", restoreUser, requireAuth, async (req, res) => {
  const { name, about, type, private, city, state } = req.body;
  const organizerid = req.user.id;
  const group = await Group.create({
    organizerid,
    name,
    about,
    type,
    private,
    city,
    state,
  });

  await Membership.create({
    status: "co-host",
    userid: organizerid,
    groupid: group.id,
  });

  return res.status(201).json(group);
});

// Add an Image to a Group based on the Group's id
router.post("/:groupId/images", restoreUser, requireAuth, async (req, res) => {
  const id = req.params.groupId;
  const userid = req.user.id;
  const { url, preview } = req.body;

  const group = await Group.findByPk(id);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  if (userid === group.organizerid) {
    const createdImg = await Groupimage.create({
      url,
      groupid: id,
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
  const userid = req.user.id;
  const { name, about, type, private, city, state } = req.body;
  const group = await Group.findByPk(id);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  if (userid === group.organizerid) {
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
  const userid = req.user.id;
  const { name, about, type, private, city, state } = req.body;
  const group = await Group.findByPk(id);

  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  if (userid === group.organizerid) {
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

module.exports = router;
