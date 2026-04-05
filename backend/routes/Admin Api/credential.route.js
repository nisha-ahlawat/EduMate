const express = require("express");
const router = express.Router();
const { loginHandler, registerHandler, updateHandler, deleteHandler } = require("../../controllers/Admin/credential.controller.js");
const { refreshHandler, logoutHandler } = require("../../routes/commonAuthHandlers");

router.post("/login", loginHandler);
router.post("/refresh", (req, res) => refreshHandler(req, res, "admin"));
router.post("/logout", (req, res) => logoutHandler(req, res, "admin"));

router.post("/register", registerHandler);

router.put("/update/:id", updateHandler);

router.delete("/delete/:id", deleteHandler);

module.exports = router;
