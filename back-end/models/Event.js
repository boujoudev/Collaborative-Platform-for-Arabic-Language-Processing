module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
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
        type: DataTypes.TEXT,
        allowNull: false
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false
      },
      visibility: {
        type: DataTypes.ENUM('public', 'private'),
        defaultValue: 'public'
      }
    }, {
      tableName: 'events',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      indexes: [
        {
          fields: ['start_time']
        },
        {
          fields: ['deadline']
        }
      ]
    });
  
    Event.associate = (models) => {
      Event.belongsTo(models.User, {
        foreignKey: 'owner_id',
        as: 'owner',
        onDelete: 'CASCADE'
      });
      Event.hasMany(models.EventInterest, {
        foreignKey: 'event_id',
        as: 'interests'
      });
      Event.hasMany(models.Comment, {
        foreignKey: 'entity_id',
        constraints: false,
        scope: {
          entity_type: 'event'
        }
      });
      Event.hasMany(models.Evaluation, {
        foreignKey: 'entity_id',
        constraints: false,
        scope: {
          entity_type: 'event'
        }
      });
    };
  
    return Event;
  };