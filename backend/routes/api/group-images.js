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

// Delete an Image for a Group
router.delete("/:imageId", restoreUser, requireAuth, async (req, res) => {
  const id = req.params.imageId;
  const userId = req.user.id;
  const groupImage = await Groupimage.findByPk(id);

  if (!groupImage) {
    returnMsg.message = "Group Image couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }
  const group = await Group.findByPk(groupImage.groupId);
  
  if (!group) {
    returnMsg.message = "Group couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }

  const user = await Membership.findOne({
    where: {
      userId,
      groupId: group.id,
    },
  });

  if (user.status === "co-host" || group.organizerId === userId) {
    const deleted = await groupImage.destroy();
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
