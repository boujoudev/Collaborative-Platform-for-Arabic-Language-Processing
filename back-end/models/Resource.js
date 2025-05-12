module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    type: {
      type: DataTypes.ENUM('corpus', 'course', 'nlp_tool', 'publication', 'project'),
      allowNull: false
    },
    resourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'resource_id'
    }
  }, {
    tableName: 'resources',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Resource.associate = (models) => {
    // Corpus
    Resource.belongsTo(models.Corpus, {
      foreignKey: 'resource_id',
      constraints: false,
      scope: {
        type: 'corpus'
      },
      as: 'corpus'
    });

    // Course
    Resource.belongsTo(models.Course, {
      foreignKey: 'resource_id',
      constraints: false,
      scope: {
        type: 'course'
      },
      as: 'course'
    });

    // NLP Tool
    Resource.belongsTo(models.NLPTool, {
      foreignKey: 'resource_id',
      constraints: false,
      scope: {
        type: 'nlp_tool'
      },
      as: 'nlpTool'
    });

    // Publication
    Resource.belongsTo(models.Publication, {
      foreignKey: 'resource_id',
      constraints: false,
      scope: {
        type: 'publication'
      },
      as: 'publication'
    });

    // Project
    Resource.belongsTo(models.Project, {
      foreignKey: 'resource_id',
      constraints: false,
      scope: {
        type: 'project'
      },
      as: 'project'
    });
  };

  return Resource;
};