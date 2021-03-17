'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class Fee extends Model {
        static init(sequelize) {
            super.init({
                firstmonth: DataTypes.STRING,
                secondmonth: DataTypes.STRING,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'Fee',
            });
        }
        static associate(models) {
            this.belongsToMany(models.Student, {
                as: "students",
                through: models.FStudent
            });
        }
    };
    return Fee;
};