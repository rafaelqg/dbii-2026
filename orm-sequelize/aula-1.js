const { Sequelize, DataTypes,Op} = require('sequelize'); //npm install --save sequelize , npm install --save mysql2
const MYSQL_IP="localhost";
const MYSQL_LOGIN="root";
const MYSQL_PASSWORD="root";
const DATABASE = "sakila";
const sequelize = new Sequelize(DATABASE, MYSQL_LOGIN, MYSQL_PASSWORD,{host:MYSQL_IP, dialect: "mysql"});

const Actor = sequelize.define('Actor', {
  actor_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  first_name: {type: DataTypes.STRING(45), allowNull: false },
  last_name: {type: DataTypes.STRING(45), allowNull: false },
    last_update: {type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
  }, {tableName: 'actor',timestamps: false});

function printSequelizeObjects(results){
    let tabularData = results.map(result => result.dataValues);
    console.table(tabularData);
}

async function createActor(firstName, lastName){
  let newObject = {
     first_name: firstName,
     last_name: lastName
    }; 
  let result = await Actor.create(newObject);
  console.log("Created actor:", result);
}

console.log("Actor class", Actor);
async function filterActors(){ 
  try{
  let returnedEntries = await Actor.findAll();
  console.log("returnedEntries", returnedEntries.length);
  printSequelizeObjects(returnedEntries);
 }catch(e){
  console.error("error", e);
 }
};
filterActors();
//createActor("John", "Doe");