module.exports = (sequelize, DataTypes) => {
    const ProjectParticipant = sequelize.define('ProjectParticipant', {
      role: {
        type: DataTypes.STRING(50),
        defaultValue: 'member'
      },
      joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'project_participants',
      timestamps: false,
      indexes: [
        {
          fields: ['project_id']
        }
      ]
    });
  
    ProjectParticipant.associate = (models) => {
      ProjectParticipant.belongsTo(models.Project, {
        foreignKey: 'project_id',
        onDelete: 'CASCADE'
      });
      ProjectParticipant.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };

    

    // Before create hook to check if the user is already a project owner
ProjectParticipant.beforeCreate(async (participant, options) => {
    const projectOwners = await sequelize.models.ProjectOwner.findAll({
      where: {
        project_id: participant.project_id,
        user_id: participant.user_id
      }
    });
    
    if (projectOwners.length > 0) {
      throw new Error('Project owner cannot be a participant in their own project');
    }
  });
  
  // Before update hook (in case project_id or user_id changes)
  ProjectParticipant.beforeUpdate(async (participant, options) => {
    if (participant.changed('project_id') || participant.changed('user_id')) {
      const projectOwners = await sequelize.models.ProjectOwner.findAll({
        where: {
          project_id: participant.project_id,
          user_id: participant.user_id
        }
      });
      
      if (projectOwners.length > 0) {
        throw new Error('Project owner cannot be a participant in their own project');
      }
    }
  });

  
    return ProjectParticipant;
  };