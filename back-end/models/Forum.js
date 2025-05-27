module.exports = (sequelize, DataTypes) => {
    const Forum = sequelize.define('Forum', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT
      },
      photo: {
        type: DataTypes.TEXT,
        defaultValue: 'default.png'
      },
      topic: {
        type: DataTypes.STRING(100)
      },
      visibility: {
        type: DataTypes.ENUM('public', 'private', 'restricted'),
        defaultValue: 'public'
      }
    }, {
      tableName: 'forums',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false
    });
  
    Forum.associate = (models) => {
      Forum.belongsTo(models.User, {
        foreignKey: 'owner_id',
        as: 'owner',
        onDelete: 'CASCADE'
      });

      Forum.belongsToMany(models.User, {
  through: models.UserForum,
  foreignKey: 'forumId',
  as: 'members'
});
      Forum.hasMany(models.Post, {
        foreignKey: 'forum_id',
        as: 'posts'
      });
    };
  
    return Forum;
  };