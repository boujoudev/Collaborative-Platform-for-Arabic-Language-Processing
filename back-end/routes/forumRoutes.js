const express = require('express')
const Forum = require("../models/forumModels"); 

const router = express.Router();


router.get('/', (req, res) => {
    try {
        const forums = Forum.getAllPosts();
        res.status(200).json(forums);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
)   

module.exports = router



