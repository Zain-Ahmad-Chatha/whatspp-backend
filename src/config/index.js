const dotenv = require("dotenv");
// dotenv.config();
const result = dotenv.config();

/*
          TWO WAYS TO EXPORT ENV VARIABLES
*/

/*
     i -
    first is using module.exports object and naming all variables agains with the names whatever we want.
    but the issue is we declare a variable and we have to also include in the object that is exporting
*/

module.exports = {
  port: process.env.PORT,
  db_name: process.env.DB_NAME,
  hash_salt: process.env.HASH_SALT,
  private_secret_key: process.env.PRIVATE_SECRET_KEY,
};

/*
    ii-
    second. dotenv.config() gives us a function parsed with all variables and we can export it and we don't need
    add again a variable in the object in this file..
*/

// if (result.error) {
//   throw result.error;
// }
// const { parsed: envs } = result;
// module.exports = envs;
