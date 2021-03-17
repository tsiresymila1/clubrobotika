'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class FStudent extends Model {
        static init(sequelize) {
            super.init({
                ispay: DataTypes.BOOLEAN,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'FStudent',
            });
        }
        static associate(models) {}
    };
    return FStudent;
};