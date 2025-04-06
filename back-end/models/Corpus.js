module.exports = (sequelize, DataTypes) => {
    const Corpus = sequelize.define('Corpus', {
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
      }
    }, {
      tableName: 'corpus',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      indexes: [
        {
          fields: ['title']
        }
      ]
    });
  
    Corpus.associate = (models) => {
      Corpus.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'creator',
        onDelete: 'CASCADE'
      });
      Corpus.hasMany(models.CorpusFile, {
        foreignKey: 'corpus_id',
        as: 'files'
      });
      Corpus.hasMany(models.AnnotationFile, {
        foreignKey: 'corpus_id',
        as: 'annotations'
      });
      Corpus.hasMany(models.Comment, {
        foreignKey: 'entity_id',
        constraints: false,
        scope: {
          entity_type: 'corpus'
        }
      });
      Corpus.hasMany(models.Evaluation, {
        foreignKey: 'entity_id',
        constraints: false,
        scope: {
          entity_type: 'corpus'
        }
      });
    };
  
    return Corpus;
  };