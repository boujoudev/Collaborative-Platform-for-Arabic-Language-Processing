module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      photo: {
        type: DataTypes.TEXT
      }
    }, {
      tableName: 'posts',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false
    });
  
    Post.associate = (models) => {
      Post.belongsTo(models.Forum, {
        foreignKey: 'forum_id',
        as: 'forum',
        onDelete: 'CASCADE'
      });
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'author',
        onDelete: 'CASCADE'
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'entity_id',
        constraints: false,
        scope: {
          entity_type: 'post'
        }
      });
      Post.hasMany(models.Evaluation, {
        foreignKey: 'entity_id',
        constraints: false,
        scope: {
          entity_type: 'post'
        }
      });
    };
  
    return Post;
  };