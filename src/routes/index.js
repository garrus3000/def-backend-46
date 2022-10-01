const Router = require('koa-router');

const apiRouter = new Router({
    prefix: '/api/productos'
});

const routerProductos = require("../controllers/mongodb/products.controller");

apiRouter.use( routerProductos.routes());

module.exports = apiRouter;