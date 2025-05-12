module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
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
        type: DataTypes.TEXT
      },
      link: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: true
        }
      }
    }, {
      tableName: 'courses',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false
    });
  Course.hasMany(models.Resource, {
  foreignKey: 'resource_id',
  constraints: false,
  scope: {
    type: 'course'
  },
  as: 'resources'
});
    Course.associate = (models) => {
      Course.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'creator',
        onDelete: 'CASCADE'
      });
      Course.belongsTo(models.CourseCategory, {
        foreignKey: 'category_id',
        as: 'category',
        onDelete: 'CASCADE'
      });
      Course.hasMany(models.CourseFile, {
        foreignKey: 'course_id',
        as: 'files'
      });
      Course.hasMany(models.Comment, {
        foreignKey: 'entity_id',
        constraints: false,
        scope: {
          entity_type: 'course'
        }
      });
      Course.hasMany(models.Evaluation, {
        foreignKey: 'entity_id',
        constraints: false,
        scope: {
          entity_type: 'course'
        }
      });
    };
  
    return Course;
  };