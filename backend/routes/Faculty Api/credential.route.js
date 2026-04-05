const express = require("express");
const { loginHandler, registerHandler, updateHandler, deleteHandler } = require("../../controllers/Faculty/credential.controller.js");
const { refreshHandler, logoutHandler } = require("../../routes/commonAuthHandlers");
const router = express.Router();

router.post("/login", loginHandler);
router.post("/refresh", (req, res) => refreshHandler(req, res, "faculty"));
router.post("/logout", (req, res) => logoutHandler(req, res, "faculty"));

router.post("/register", registerHandler);

router.put("/update/:id", updateHandler);

router.delete("/delete/:id", deleteHandler);

module.exports = router;
