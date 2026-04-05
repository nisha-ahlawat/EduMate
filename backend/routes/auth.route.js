const express = require("express");
const { refreshHandler, logoutHandler } = require("./commonAuthHandlers");
const router = express.Router();

router.post("/refresh", (req, res) => refreshHandler(req, res));
router.post("/logout", (req, res) => logoutHandler(req, res));

module.exports = router;


