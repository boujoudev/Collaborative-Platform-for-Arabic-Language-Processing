module.exports = (sequelize, DataTypes) => {
    const AnnotationFile = sequelize.define('AnnotationFile', {
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
      tableName: 'annotation_files',
      timestamps: false
    });
  
    AnnotationFile.associate = (models) => {
      AnnotationFile.belongsTo(models.Corpus, {
        foreignKey: 'corpus_id',
        onDelete: 'CASCADE'
      });
      AnnotationFile.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
    };
  
    return AnnotationFile;
  };