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
      }
    }, {
      tableName: 'comments',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      indexes: [
        {
          fields: ['entity_type', 'entity_id']
        }
      ]
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'author',
        onDelete: 'CASCADE'
      });
    };
  
    return Comment;
  };