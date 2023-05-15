const Sequelize = require('sequelize');
//ptDate 모델 생성 
module.exports = class PtDate extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            
            ptdateId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            ptDate: {
                type: Sequelize.STRING(20),
                allowNull: true
            },

        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'PtDate',
            tableName: 'ptDates',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
 
    static associate(db) {  
        db.PtDate.belongsTo(db.Pt, { foreignKey: 'ptId', sourceKey: 'ptId', onDelete: 'cascade' });
    }
};
