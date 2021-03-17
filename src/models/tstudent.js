'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class TStudent extends Model {
        static init(sequelize) {
            super.init({
                note: DataTypes.STRING,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'TStudent',
            });
        }
        static associate(models) {}
    };
    return TStudent;
};