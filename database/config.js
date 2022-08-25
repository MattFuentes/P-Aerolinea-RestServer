const mongoose = require('mongoose');



const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DataBase Init')
    } catch (error) {
        console.log(error)
        throw new Error('Error init DB')
    }
}


module.exports = {
    dbConnection
}