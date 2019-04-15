const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    const dbURL = process.env.DATABASE_URL;
    console.log("Trying to connect to DB " + dbURL);
    await mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
  } catch (O_o) {
    console.log("Sever initialization failed " , O_o.message);
  }
};

exports.connectDB = connectDB;


exports.handleConnectionError = () => {
    const dbURL = process.env.DATABASE_URL;
    // If the connection throws an error
    mongoose.connection.on("error", function(err) {
      console.error('Failed to connect to DB ' + dbURL + ' on startup ', err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection to DB :' + dbURL + ' disconnected');
    });

    const gracefulExit = function() { 
      mongoose.connection.close(() => {
        console.log('Mongoose default connection with DB :' + dbURL + ' is disconnected through app termination');
        process.exit(0);
      });
    }

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

}

