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
  const id = req.params.venueId;
  const userid = req.user.id;
  const { address, city, state, lat, lng } = req.body;

  const venue = await Venue.findByPk(id);
  if (!venue) {
    returnMsg.message = "Venue couldn't be found";
    returnMsg.statusCode = 404;
    return res.status(404).json(returnMsg);
  }

  const group = await Group.findAll({
    where:{
      organizerid:userid
    },
    include:{
      model: Event,
      include:{
        model: Venue, as: "Venues",
      }
    }
  })

  console.log(group[0].Events[0].Venues)
  if (id === group){
    const updates = await venue.update({
      address,
      city,
      state,
      lat,
      lng,
    });
    return res.status(200).json(updates);
  } else {
    returnMsg.message = "Forbidden";
    returnMsg.statusCode = 403;
    return res.status(403).json(returnMsg);
  }
});

module.exports = router;
