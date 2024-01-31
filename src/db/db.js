import {Sequelize}  from "sequelize"
export const sequelize  = new Sequelize ('qtkjbgnt','qtkjbgnt','MdW47rWYy960qvW5ejBGU_pfdhSgcM6M',
{
    host : 'rosie.db.elephantsql.com',
    dialect:'postgres',
    port: 5432,
  logging: false,

})