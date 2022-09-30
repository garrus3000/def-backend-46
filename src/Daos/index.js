
require("dotenv").config()

const yargArgs = require("../utils/yarg-cli")


let productos;


switch (yargArgs.DB_HOST || process.env.DB_HOST) {
	case "mongodb":
		const MongoDaoProducts = require("./mongodb/MongoDaoProducts");

		productos = MongoDaoProducts.getInstance();
		break;

	default:
		throw new Error("No se ha definido una conexión a la base de datos");
		break;
}

const productsDao = productos;

module.exports = { productsDao};