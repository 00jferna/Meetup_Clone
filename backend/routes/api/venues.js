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

// Edit a Venue specified by its id
router.put("/:venueId", restoreUser, requireAuth, async (req, res) => {
  const id = +req.params.venueId;
  const userId = req.user.id;
  const { address, city, state, lat, lng } = req.body;

  const venue = await Venue.findByPk(id);
  if (!venue) {
    returnMsg.message = "Venue couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }

  const group = await Group.findByPk(venue.groupId);
  
  const user = await Membership.findOne({
    where: {
      userId,
      groupId: group.id,
    },
  });

  if (user.status === "co-host" || group.organizerId === userId) {
    await venue.update({
      address,
      city,
      state,
      lat,
      lng,
    });

    const updates = await Venue.scope("newVenue").findByPk(id);

    return res.status(200).json(updates);
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

module.exports = router;
