
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false
    },
    reported_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reported_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'reviewed', 'resolved'),
      defaultValue: 'pending',
      allowNull: false
    }
  }, {
    tableName: 'reports',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Report.associate = (models) => {
    // A Report belongs to a User (the reporter)
    Report.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'reporter',
      onDelete: 'CASCADE'
    });

    // Polymorphic association: Report can belong to Post, Comment, User, etc.
    Report.belongsTo(models.User, {
      foreignKey: 'reported_id',
      constraints: false,
      scope: {
        reported_type: 'User'
      },
      as: 'reportedUser'
    });

    Report.belongsTo(models.Post, {
      foreignKey: 'reported_id',
      constraints: false,
      scope: {
        reported_type: 'Post'
      },
      as: 'reportedPost'
    });

    Report.belongsTo(models.Comment, {
      foreignKey: 'reported_id',
      constraints: false,
      scope: {
        reported_type: 'Comment'
      },
      as: 'reportedComment'
    });

    Report.belongsTo(models.Publication, {
      foreignKey: 'reported_id',
      constraints: false,
      scope: {
        reported_type: 'Publication'
      },
      as: 'reportedPublication'
    });

    Report.belongsTo(models.Course, {
      foreignKey: 'reported_id',
      constraints: false,
      scope: {
        reported_type: 'Course'
      },
      as: 'reportedCourse'
    });

    Report.belongsTo(models.Project, {
      foreignKey: 'reported_id',
      constraints: false,
      scope: {
        reported_type: 'Project'
      },
      as: 'reportedProject'
    });

    Report.belongsTo(models.NLPTool, {
      foreignKey: 'reported_id',
      constraints: false,
      scope: {
        reported_type: 'NLPTool'
      },
      as: 'reportedNLPTool'
    });
  };

  return Report;
};