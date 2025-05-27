module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    entity_type: {
      type: DataTypes.ENUM('post', 'project', 'event', 'nlp_tool', 'corpus', 'course', 'publication'),
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
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
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

    // Association auto-référencée : un commentaire peut avoir un parent
    Comment.belongsTo(models.Comment, {
      foreignKey: 'parent_id',
      as: 'parent',
      onDelete: 'CASCADE'
    });

    // Un commentaire peut avoir plusieurs réponses
    Comment.hasMany(models.Comment, {
      foreignKey: 'parent_id',
      as: 'replies'
    });
  };

  return Comment;
};
