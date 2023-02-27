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

// Delete an Image for an Event
router.delete("/:imageId", restoreUser, requireAuth, async (req, res) => {
  const imageId = req.params.imageId;
  const userId = req.user.id;
  const eventImage = await EventImage.findByPk(imageId);

  if (!eventImage) {
    returnMsg.message = "Event Image couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }

  const event = await Event.findByPk(eventImage.eventId);
  
  const group = await Event.findByPk(event.groupId);

  const user = await Membership.findOne({
    where: {
      userId,
      groupId: event.groupId,
    },
  });

  if (user.status === "co-host" || group.organizerId === userId) {
    const deleted = await eventImage.destroy();
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
