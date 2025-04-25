const express = require("express");
const contactController = require("../controllers/contact.controller");

const router = express.Router();

// Routes for contact
router.post("/contactMessage", contactController.contactMessageController);


module.exports = router;