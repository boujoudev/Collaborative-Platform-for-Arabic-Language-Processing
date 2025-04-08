module.exports = (sequelize, DataTypes) => {
    const CourseCategory = sequelize.define('CourseCategory', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      }
    }, {
      tableName: 'course_categories',
      timestamps: false,
      indexes: [
        {
          fields: ['name']
        }
      ]
    });
  
    CourseCategory.associate = (models) => {
      CourseCategory.hasMany(models.Course, {
        foreignKey: 'category_id',
        as: 'courses'
      });
    };
  
    return CourseCategory;
  };