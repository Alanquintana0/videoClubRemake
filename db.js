const Sequelize = require('sequelize');
const directorModel = require('./models/director');
const genreModel = require('./models/genres');

const sequelize = new Sequelize('video-club',
'root', 'secret', {
    host:'127.0.0.1',
    dialect:'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);





module.exports = {Director, Genre}