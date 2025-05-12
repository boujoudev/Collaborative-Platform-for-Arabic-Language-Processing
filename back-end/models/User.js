module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      full_name: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('admin', 'moderator', 'user'),
        defaultValue: 'user'
      },
      certified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      profile_picture: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      lastLogin: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      resetPasswordToken: {
        type: DataTypes.STRING
      },
      resetPasswordExpiresAt: {
        type: DataTypes.DATE
      },
      verificationToken: {
        type: DataTypes.STRING
      },
      verificationTokenExpiresAt: {
        type: DataTypes.DATE
      }
  }, {
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      indexes: [
        {
          fields: ['email']
        },
        {
          fields: ['username']
        }
      ]
    });
  
    User.associate = (models) => {
      // A user can own multiple forums
      User.hasMany(models.Forum, {
        foreignKey: 'owner_id',
        as: 'ownedForums'
      });
      
      // A user can create multiple posts
      User.hasMany(models.Post, {
        foreignKey: 'user_id',
        as: 'posts'
      });
      
      // A user can make multiple comments
      User.hasMany(models.Comment, {
        foreignKey: 'user_id',
        as: 'comments'
      });
      
      // A user can have multiple evaluations (votes)
      User.hasMany(models.Evaluation, {
        foreignKey: 'user_id',
        as: 'votes'
      });
      
      // A user can own multiple events
      User.hasMany(models.Event, {
        foreignKey: 'owner_id',
        as: 'ownedEvents'
      });
      
      // A user can be interested in multiple events
      User.hasMany(models.EventInterest, {
        foreignKey: 'user_id',
        as: 'eventInterests'
      });
      
      // A user can own multiple projects (through project_owners)
      User.belongsToMany(models.Project, {
        through: models.ProjectOwner,
        foreignKey: 'user_id',
        as: 'ownedProjects'
      });
      
      // A user can participate in multiple projects
      User.belongsToMany(models.Project, {
        through: models.ProjectParticipant,
        foreignKey: 'user_id',
        as: 'participatingProjects'
      });
      
      // A user can make multiple project requests
      User.hasMany(models.ProjectRequest, {
        foreignKey: 'user_id',
        as: 'projectRequests'
      });
      
      // A user can upload multiple project files
      User.hasMany(models.ProjectFile, {
        foreignKey: 'user_id',
        as: 'uploadedProjectFiles'
      });
      
      // A user can create multiple NLP tools
      User.hasMany(models.NLPTool, {
        foreignKey: 'user_id',
        as: 'createdTools'
      });
      
      // A user can create multiple corpora
      User.hasMany(models.Corpus, {
        foreignKey: 'user_id',
        as: 'createdCorpora'
      });
      
      // A user can upload multiple corpus files
      User.hasMany(models.CorpusFile, {
        foreignKey: 'user_id',
        as: 'uploadedCorpusFiles'
      });
      
      // A user can upload multiple annotation files
      User.hasMany(models.AnnotationFile, {
        foreignKey: 'user_id',
        as: 'uploadedAnnotationFiles'
      });
      
      // A user can have multiple publications
      User.hasMany(models.Publication, {
        foreignKey: 'user_id',
        as: 'publications'
      });
      
      // A user can create multiple courses
      User.hasMany(models.Course, {
        foreignKey: 'user_id',
        as: 'createdCourses'
      });
      
      // A user can upload multiple course files
      User.hasMany(models.CourseFile, {
        foreignKey: 'user_id',
        as: 'uploadedCourseFiles'
      });
    };
  
    return User;
  };