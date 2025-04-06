module.exports = (sequelize, DataTypes) => {
    const CourseFile = sequelize.define('CourseFile', {
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
      tableName: 'course_files',
      timestamps: false
    });
  
    CourseFile.associate = (models) => {
      CourseFile.belongsTo(models.Course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE'
      });
      CourseFile.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };
  
    return CourseFile;
  };