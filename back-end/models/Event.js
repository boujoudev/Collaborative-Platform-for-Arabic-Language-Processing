module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true, // Optional if not mandatory
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    visibility: {
      type: DataTypes.ENUM('public', 'private'),
      defaultValue: 'public',
    },
    type: {
      type: DataTypes.ENUM('online', 'in_person'), // Corresponds to "En ligne" or "En personne"
      allowNull: false,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    external_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'events',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      {
        fields: ['start_time'],
      },
      {
        fields: ['deadline'],
      },
    ],
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'owner_id',
      as: 'owner',
      onDelete: 'CASCADE',
    });
    Event.hasMany(models.EventInterest, {
      foreignKey: 'event_id',
      as: 'interests',
    });
    Event.hasMany(models.Comment, {
      foreignKey: 'entity_id',
      constraints: false,
      scope: {
        entity_type: 'event',
      },
    });
    Event.hasMany(models.Evaluation, {
      foreignKey: 'entity_id',
      constraints: false,
      scope: {
        entity_type: 'event',
      },
    });
  };

  return Event;
};
