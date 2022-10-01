const Router = require('koa-router');
const routerProductos = new Router();


const {
    getAllProducts,
    getProductsById,
    postNewProduct,
    deleteProductById,
    putProductById,
} = require("../../services/products-services");


routerProductos.get('/', getAllProducts);

routerProductos.get('/:id', getProductsById);

routerProductos.post('/', postNewProduct);

routerProductos.delete('/:id', deleteProductById);

routerProductos.put('/:id', putProductById);


module.exports = routerProductos;