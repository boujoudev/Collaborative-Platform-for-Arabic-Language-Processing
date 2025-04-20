module.exports = (sequelize, DataTypes) => {
    const Evaluation = sequelize.define('Evaluation', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      entity_type: {
        type: DataTypes.ENUM('post', 'project', 'event', 'nlp_tool', 'corpus', 'course'),
        allowNull: false
      },
      entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      vote: {
        type: DataTypes.INTEGER,
        validate: {
          isIn: [[-1, 1]]
        }
      }
    }, {
      tableName: 'evaluations',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      indexes: [
        {
          unique: true,
          fields: ['entity_type', 'entity_id', 'user_id']
        },
        {
          fields: ['entity_id', 'entity_type']
        },
        {
          fields: ['user_id']
        }
      ]
    });
  
    Evaluation.associate = (models) => {
      Evaluation.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'voter',
        onDelete: 'CASCADE'
      });
    };
  
    return Evaluation;
  };