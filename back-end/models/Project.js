module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    visibility: {
      type: DataTypes.ENUM('public', 'private'),
      defaultValue: 'public'
    },
    status: {
      type: DataTypes.ENUM('finished', 'ongoing'),
      defaultValue: 'ongoing'
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    }
  }, {
    tableName: 'projects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      {
        fields: ['status']
      }
    ]
  });

  Project.associate = (models) => {
    Project.belongsToMany(models.User, {
      through: models.ProjectOwner,
      foreignKey: 'project_id',
      as: 'owners'
    });
    Project.belongsToMany(models.User, {
      through: models.ProjectParticipant,
      foreignKey: 'project_id',
      as: 'participants'
    });
    Project.hasMany(models.ProjectRequest, {
      foreignKey: 'project_id',
      as: 'requests'
    });
    Project.hasMany(models.Resource, {
      foreignKey: 'resource_id',
      constraints: false,
      scope: {
        type: 'project'
      },
      as: 'resources'
    });
    Project.hasMany(models.ProjectFile, {
      foreignKey: 'project_id',
      as: 'files'
    });
    Project.hasMany(models.Comment, {
      foreignKey: 'entity_id',
      constraints: false,
      scope: {
        entity_type: 'project'
      }
    });
    Project.hasMany(models.Evaluation, {
      foreignKey: 'entity_id',
      constraints: false,
      scope: {
        entity_type: 'project'
      }
    });
  };

  return Project;
};
