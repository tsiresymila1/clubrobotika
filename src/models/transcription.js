'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class Transcription extends Model {
        static init(sequelize) {
            super.init({
                bareme: DataTypes.STRING,
                title: DataTypes.STRING,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'Transcription',
            });
        }
        static associate(models) {
            this.belongsToMany(models.Student, {
                as: "students",
                through: models.TStudent
            });
        }
    };
    return Transcription;
};