//모델 생성 
const Sequelize = require('sequelize');
const User = require('./user');
const Pt = require('./pt');
const PtDate = require('./ptDate');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const db = {};
//Sequelize로 DB연결
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Pt = Pt;
db.PtDate = PtDate;
//init으로 sequelize와 연결 
User.init(sequelize);
Pt.init(sequelize);
PtDate.init(sequelize);
//Associate로 관계 설정 
User.associate(db);
Pt.associate(db);
PtDate.associate(db);

module.exports = db;