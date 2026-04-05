const express = require("express");
const { getNotice, addNotice, updateNotice, deleteNotice } = require("../../controllers/Other/notice.controller");
const router = express.Router();
const upload = require('../../middlewares/multer.middleware.js');

// Routes
router.get("/getNotice", getNotice);
router.post("/addNotice", upload.single("notice"), addNotice);
router.put("/updateNotice/:id", upload.single("notice"), updateNotice);
router.delete("/deleteNotice/:id", deleteNotice);

module.exports = router;
