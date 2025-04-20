module.exports = (sequelize, DataTypes) => {
    const ProjectFile = sequelize.define('ProjectFile', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      file_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      file_path: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'project_files',
      timestamps: false
    });
  
    ProjectFile.associate = (models) => {
      ProjectFile.belongsTo(models.Project, {
        foreignKey: 'project_id',
        onDelete: 'CASCADE'
      });
      ProjectFile.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };
  
    return ProjectFile;
  };