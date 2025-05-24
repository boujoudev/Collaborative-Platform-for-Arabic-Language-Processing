module.exports = (sequelize, DataTypes) => {
  const NLPTool = sequelize.define('NLPTool', {
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
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    domaine: {                // <-- ajout du champ domaine
      type: DataTypes.STRING(100),
      allowNull: true         // ou false si tu veux le rendre obligatoire
    }
  }, {
    tableName: 'nlp_tools',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      {
        fields: ['title']
      },
      {
        fields: ['domaine']     // index facultatif sur domaine si utile
      }
    ]
  });

  NLPTool.associate = (models) => {
    NLPTool.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'creator',
      onDelete: 'CASCADE'
    });
    NLPTool.hasMany(models.Comment, {
      foreignKey: 'entity_id',
      constraints: false,
      scope: {
        entity_type: 'nlp_tool'
      }
    });
    NLPTool.hasMany(models.Evaluation, {
      foreignKey: 'entity_id',
      constraints: false,
      scope: {
        entity_type: 'nlp_tool'
      }
    });
  };

  return NLPTool;
};
