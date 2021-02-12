

//Dependencies...........................................
// import the Sequelize constructor from the library 
const Sequelize = require('sequelize');

let sequelize 

if(process.env.JAWSDB_URL){

    sequelize = new Sequelize (process.env.JAWSDB_URL, {dialect:'mysql'})
    
}else{

    // create connection to our database, pass in your MYSQL information for username and password
         sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW,{
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;