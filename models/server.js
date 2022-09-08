const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app = express();
        this.flyPath = '/api/vuelos';
        this.userPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.port = process.env.PORT
        // Connect DB
        this.connectDB();
        // Middlewares
        this.middlewares();
        // App Routes
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }
    middlewares() {
        // CORS
        this.app.use( cors() );
        // Read & Parse
        this.app.use( express.json() );
        // Public Dir
        this.app.use( express.static('public') );
    }

    routes() {
        //Middleware Conditional
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.flyPath, require('../routes/fly'));
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening Backend in port ' + this.port);
        });
    }
}

module.exports = Server;