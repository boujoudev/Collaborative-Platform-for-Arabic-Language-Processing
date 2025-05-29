const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/:followingId', authenticate, followController.followUser);
router.delete('/unfollow/:followingId', authenticate, followController.unfollowUser);
router.get('/:userId/followers', followController.getFollowers);
router.get('/:userId/following', followController.getFollowing);
router.get('/is-following/:followingId', authenticate, followController.isFollowingUser);


module.exports = router;
