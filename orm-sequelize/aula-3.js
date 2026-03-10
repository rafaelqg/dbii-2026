const { Sequelize, DataTypes,Op, where, fn, col} = require('sequelize'); //npm install --save sequelize , npm install --save mysql2
const MYSQL_IP="localhost";
const MYSQL_LOGIN="root";
const MYSQL_PASSWORD="root";
const DATABASE = "sakila";
const sequelize = new Sequelize(DATABASE, MYSQL_LOGIN, MYSQL_PASSWORD,{host:MYSQL_IP, dialect: "mysql"});

const Film = sequelize.define('Film', {
  filmId: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'film_id' },
  title: {type: DataTypes.STRING(255), allowNull: false },
  description: {type: DataTypes.TEXT, allowNull: true },
  releaseYear: {type: DataTypes.INTEGER, allowNull: true, field: 'release_year' },
  languageId: {type: DataTypes.INTEGER, allowNull: false, field: 'language_id' },
  originalLanguageId: {type: DataTypes.INTEGER, allowNull: true, field: 'original_language_id' },
  rentalDuration: {type: DataTypes.INTEGER, allowNull: false, field: 'rental_duration' },
  rentalRate: {type: DataTypes.DECIMAL(4,2), allowNull: false, field: 'rental_rate' },
  length: {type: DataTypes.INTEGER, allowNull: true },
  replacementCost: {type: DataTypes.DECIMAL(5,2), allowNull: false, field: 'replacement_cost' },
  rating: {type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'), allowNull: true },
  lastUpdate: {type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), field: 'last_update' }
}, {tableName: 'film',timestamps: false});

const Language = sequelize.define('Language', {
  languageId: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'language_id' },
  name: {type: DataTypes.STRING(20), allowNull: false },
  lastUpdate: {type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), field: 'last_update' }
}, {tableName: 'language',timestamps: false});

Film.belongsTo(Language, { foreignKey: 'languageId' });

const Country = sequelize.define('Country', {
  countryId: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'country_id' },
  name: {type: DataTypes.STRING(50), allowNull: false, field: 'country' },
  lastUpdate: {type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), field: 'last_update' }
}, {tableName: 'country',timestamps: false});

const City = sequelize.define('City', {
  cityId: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'city_id' },
  countryId: {type: DataTypes.INTEGER, allowNull: false, field: 'country_id' },
  name: {type: DataTypes.STRING(50), allowNull: false, field: 'city' },
  lastUpdate: {type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), field: 'last_update' }
}, {tableName: 'city',timestamps: false});

Country.hasMany(City, { foreignKey: 'countryId' });
City.belongsTo(Country, { foreignKey: 'countryId' });


async function getCitiesByCountry(countryName){
  let objects = await City.findAll({
    include: [{ model: Country, where: { name: countryName } }]
  });
  printSequelizeObjects(objects);
}

async function getCountryWithCities(countryName){
  let objects = await Country.findAll({
    include: [{ model: City }],
    where: { name: countryName }
  });
  printSequelizeObjects(objects);
}

getCitiesByCountry("Austria");
getCountryWithCities("Austria");

function printSequelizeObjects(results){
    let tabularData = results.map(result => result.dataValues);
    console.table(tabularData);
}

async function getFilmsByLanguage(languageName){
  let objects = await Film.findAll({
    include: [{ model: Language, where: { name: languageName } }]
  });
  printSequelizeObjects(objects);
}

//getFilmsByLanguage("English");