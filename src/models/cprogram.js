'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class Cprogram extends Model {
        static init(sequelize) {
            super.init({
                programid: {
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                    unique: true
                },
                coachid: {
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                    unique: true
                },
                finish: DataTypes.BOOLEAN,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'Cprogram',
            });
        }
        static associate(models) {

        }
    };
    return Cprogram;
};