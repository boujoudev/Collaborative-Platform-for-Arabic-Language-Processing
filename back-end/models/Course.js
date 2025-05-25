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
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: true // ou false si obligatoire
    },
    // Si tu veux ajouter le domaine, tu peux l’ajouter ici aussi (exemple : domain: DataTypes.STRING)
  }, {
    tableName: 'courses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'creator',
      onDelete: 'CASCADE'
    });
    // La relation avec CourseCategory est supprimée ici

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
