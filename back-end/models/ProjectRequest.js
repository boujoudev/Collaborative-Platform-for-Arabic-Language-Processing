module.exports = (sequelize, DataTypes) => {
    const ProjectRequest = sequelize.define('ProjectRequest', {
      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending'
      }
    }, {
      tableName: 'project_requests',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      indexes: [
        {
          unique: true,
          fields: ['project_id', 'user_id']
        },
        {
          fields: ['project_id']
        }
      ]
    });
  
    ProjectRequest.associate = (models) => {
      ProjectRequest.belongsTo(models.Project, {
        foreignKey: 'project_id',
        onDelete: 'CASCADE'
      });
      ProjectRequest.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };
  
    return ProjectRequest;
  };