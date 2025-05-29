const { UserFollow, User } = require('../models');

const followController = {
  // Suivre un utilisateur
  followUser: async (req, res) => {
    try {
      const followerId = req.user.id;
      const { followingId } = req.params;

      if (parseInt(followingId) === followerId) {
        return res.status(400).json({ message: "You can't follow yourself." });
      }

      const alreadyFollowing = await UserFollow.findOne({
        where: { followerId, followingId }
      });

      if (alreadyFollowing) {
        return res.status(400).json({ message: 'Already following this user.' });
      }

      await UserFollow.create({ followerId, followingId });
      return res.status(201).json({ message: 'User followed successfully.' });
    } catch (error) {
      console.error('Error following user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Se désabonner
  unfollowUser: async (req, res) => {
    try {
      const followerId = req.user.id;
      const { followingId } = req.params;

      const follow = await UserFollow.findOne({
        where: { followerId, followingId }
      });

      if (!follow) {
        return res.status(404).json({ message: 'Not following this user.' });
      }

      await follow.destroy();
      return res.status(200).json({ message: 'Unfollowed successfully.' });
    } catch (error) {
      console.error('Error unfollowing user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Tous les followers d’un utilisateur
  getFollowers: async (req, res) => {
    try {
      const { userId } = req.params;

      const followers = await UserFollow.findAll({
        where: { followingId: userId },
        include: [{
          model: User,
          as: 'follower',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(200).json(followers.map(f => f.follower));
    } catch (error) {
      console.error('Error getting followers:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Tous les utilisateurs suivis par un utilisateur
  getFollowing: async (req, res) => {
    try {
      const { userId } = req.params;

      const following = await UserFollow.findAll({
        where: { followerId: userId },
        include: [{
          model: User,
          as: 'following',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(200).json(following.map(f => f.following));
    } catch (error) {
      console.error('Error getting following:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
// Vérifier si l'utilisateur connecté suit un autre utilisateur
isFollowingUser: async (req, res) => {
  try {
    const followerId = req.user.id;
    const { followingId } = req.params;

    const follow = await UserFollow.findOne({
      where: { followerId, followingId }
    });

    return res.status(200).json({ isFollowing: !!follow });
  } catch (error) {
    console.error('Error checking follow status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},
};




module.exports = followController;
