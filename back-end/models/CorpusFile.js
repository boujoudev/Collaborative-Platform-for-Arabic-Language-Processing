module.exports = (sequelize, DataTypes) => {
    const CorpusFile = sequelize.define('CorpusFile', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      file_name: {
        type: DataTypes.STRING(255),
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
      tableName: 'corpus_files',
      timestamps: false
    });
  
    CorpusFile.associate = (models) => {
      CorpusFile.belongsTo(models.Corpus, {
        foreignKey: 'corpus_id',
        onDelete: 'CASCADE'
      });
       
      CorpusFile.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };
  
    return CorpusFile;
  };