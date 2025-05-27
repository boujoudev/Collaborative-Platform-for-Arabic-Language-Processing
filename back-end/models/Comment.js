module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      entity_type: {
        type: DataTypes.ENUM('post', 'project', 'event', 'nlp_tool', 'corpus', 'course'),
        allowNull: false
      },
      entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      image: {
        type: DataTypes.TEXT
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'comments',
          key: 'id'
        }
      }
    }, {
      tableName: 'comments',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      indexes: [
        {
          fields: ['entity_type', 'entity_id']
        },
        {
          fields: ['parent_id']
        }
      ]
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'author',
        onDelete: 'CASCADE'
      });

      // Self-referential association for replies
      Comment.belongsTo(Comment, {
        foreignKey: 'parent_id',
        as: 'parent'
      });

      Comment.hasMany(Comment, {
        foreignKey: 'parent_id',
        as: 'replies'
      });
    };
  
    return Comment;
  };