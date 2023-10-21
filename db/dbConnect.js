const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
 
async function dbConnection() {
    //db connection
    mongoose.connect(
      process.env.MONGO_URI,
      {useNewUrlParser: true}
    )
    .then(() => console.log('DB Connected'))
     
    mongoose.connection.on('error', err => {
      console.log(`DB connection error: ${err.message}`)
    });

}

module.exports = dbConnection