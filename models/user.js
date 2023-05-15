const Sequelize = require('sequelize');
//user 모델 생성 
module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
          
            userId: {                
                type: Sequelize.BIGINT, 
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING(20),
                allowNull: true
            },
            date: {
                type: Sequelize.STRING(20),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false, 
            underscored: false, 
            modelName: 'User', 
            tableName: 'users', 
            paranoid: false, 
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
     
        db.User.hasOne(db.Pt, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'cascade' });
    }
};
