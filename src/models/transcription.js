'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class Transcription extends Model {
        static init(sequelize) {
            super.init({
                matricule: DataTypes.STRING,
                studentidt: DataTypes.INTEGER,
                note: DataTypes.STRING,
                sur: DataTypes.STRING,
                description: DataTypes.STRING,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'Transcription',
            });
        }
        static associate(models) {
            this.belongsTo(models.Student, {
                foreignKey: 'studentidt',
                as: "student",
            });
        }
    };
    return Transcription;
};