const express = require("express");
const router = express.Router();
const Course = require("../models/courseModels.js");

router.get("/", (req, res) => {
    try {
        const courses = Course.getAllCourses();
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
  
  
}
);

module.exports = router;