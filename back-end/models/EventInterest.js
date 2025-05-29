module.exports = (sequelize, DataTypes) => {
    const EventInterest = sequelize.define('EventInterest', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    }, {
      tableName: 'event_interest',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'event_id']
        }
      ]
    });
  
    EventInterest.associate = (models) => {
      EventInterest.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE'
      });
      EventInterest.belongsTo(models.Event, {
        foreignKey: 'event_id',
        as: 'event',
        onDelete: 'CASCADE'
      });
    };
  
    return EventInterest;
  };