const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app = express();
        this.path = {
            auth: '/api/auth',
            user: '/api/usuarios',
            fly: '/api/vuelos',
            category: '/api/categorias',
            product: '/api/productos',
            search: '/api/buscar'
        }
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
        this.app.use(this.path.auth,     require('../routes/auth'));
        this.app.use(this.path.fly,      require('../routes/fly'));
        this.app.use(this.path.user,     require('../routes/user'));
        this.app.use(this.path.category, require('../routes/category'));
        this.app.use(this.path.product,  require('../routes/product'));
        this.app.use(this.path.search,   require('../routes/search'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening Backend in port ' + this.port);
        });
    }
}

module.exports = Server;