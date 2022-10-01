
require("dotenv").config()

const yargArgs = require("../utils/yarg-cli")


let productos;
let carritos;
let mensajes;


switch (yargArgs.DB_HOST || process.env.DB_HOST) {
	case "mongodb":
		const MongoDaoProducts = require("./mongodb/MongoDaoProducts");
		const MongoDaoCarts = require("./mongodb/MongoDaoCarts");
		const MongoDaoMessages = require("./mongodb/MongoDaoMessages")

		productos = MongoDaoProducts.getInstance();
		carritos = MongoDaoCarts.getInstance();
		mensajes = MongoDaoMessages.getInstance();
		break;

	default:
		throw new Error("No se ha definido una conexión a la base de datos");
		break;
}

const productsDao = productos;
const cartDao = carritos;
const messageDao = mensajes;

module.exports = { productsDao, cartDao,  messageDao};