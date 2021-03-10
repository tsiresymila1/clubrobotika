'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {

    class Student extends Model {
        static init(sequelize) {
            super.init({
                userId: DataTypes.STRING,
                name: DataTypes.STRING,
                lastname: DataTypes.STRING,
                phone: DataTypes.STRING,
                email: DataTypes.STRING,
                birthhday: DataTypes.STRING,
                birthplace: DataTypes.STRING,
                isUniv: DataTypes.BOOLEAN,
                grade: DataTypes.STRING,
                field: DataTypes.STRING,
                school: DataTypes.STRING,
                matricule: DataTypes.STRING,
                category: DataTypes.STRING,
                motivation: DataTypes.TEXT,
                image: DataTypes.STRING,
                password: DataTypes.STRING,
                present: DataTypes.INTEGER,
                missing: DataTypes.INTEGER,
                time: DataTypes.STRING,
                createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
                updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            }, {
                sequelize,
                modelName: 'Student',
            });
        }
        static associate(models) {
            this.belongsToMany(models.Program, {
                through: 'Present',
                as: 'presents',
                foreignKey: 'studentid'
            });
        }
    };
    return Student;
};