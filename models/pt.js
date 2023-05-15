const Sequelize = require('sequelize');
//pt 모델 생성 
module.exports = class Pt extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
    
            ptId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Pt',
            tableName: 'pts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Pt.belongsTo(db.User, { foreignKey: 'userId', sourceKey: 'userId', onDelete: 'cascade' });
        db.Pt.hasOne(db.PtDate, { foreignKey: 'ptId', sourceKey: 'ptId', onDelete: 'cascade' });
    }
};
