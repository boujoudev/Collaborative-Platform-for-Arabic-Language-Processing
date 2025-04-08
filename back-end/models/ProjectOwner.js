module.exports = (sequelize, DataTypes) => {
    const ProjectOwner = sequelize.define('ProjectOwner', {}, {
      tableName: 'project_owners',
      timestamps: false
    });
  
    ProjectOwner.associate = (models) => {
      ProjectOwner.belongsTo(models.Project, {
        foreignKey: 'project_id',
        onDelete: 'CASCADE'
      });
      ProjectOwner.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };
  
    return ProjectOwner;
  };