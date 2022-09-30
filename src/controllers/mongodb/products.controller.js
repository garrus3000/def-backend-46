const Router = require('koa-router');
const routerProductos = new Router();


const {
    getAllProducts,
    getProductsById,
    postNewProduct,
    deleteProductById,
    putProductById,
} = require("../../services/products-services");


routerProductos.get('/', getAllProducts)

routerProductos.get('/:id', getProductsById)

// routerProductos
//     .route("/")
//     .get( getAllProducts)
//     .post( postNewProduct)
// ;
// routerProductos.get('/:id?', getProductsById);

// routerProductos.delete('/:id', deleteProductById);

// routerProductos.put('/:id', putProductById)

module.exports = routerProductos;