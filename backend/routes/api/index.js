// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./groups.js");
const eventsRouter = require("./events.js");
const venuesRouter = require("./venues.js");
const groupImageRouter = require("./group-images");
const eventImageRouter = require("./event-images");
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/groups", groupsRouter);

router.use("/events", eventsRouter);

router.use("/venues", venuesRouter);

router.use("/group-images", groupImageRouter);

router.use("/event-images", eventImageRouter);

module.exports = router;
