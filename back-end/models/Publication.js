module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define('Publication', {
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
      publication_type: {
        type: DataTypes.STRING(50),
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
      tableName: 'publication',
      timestamps: false,
      indexes: [
        {
          fields: ['title']
        }
      ]
    });
  
    Publication.associate = (models) => {
      Publication.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'author',
        onDelete: 'CASCADE'
      });
    };
  
    return Publication;
  };