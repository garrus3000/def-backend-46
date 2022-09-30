require('dotenv').config();

const koa = require('koa');

const koaBody = require('koa-body');

const { logger, loggerError } = require('./src/logs/winston.js');
const apiRouter = require('./src/routes/index.js');

const yargArgs = require('./src/utils/yarg-cli.js');
const cluster = require('cluster');
const os = require('os');

const app = new koa();

app.use(koaBody());


app.use(apiRouter.routes());

const PORT = process.env.PORT || yargArgs.puerto;
const MODO = yargArgs.modo;
const nroCPUs = os.cpus().length;


if (MODO !== 'FORK' && MODO !== 'CLUSTER') {
	new Error(loggerError.log("error", `Modo ${MODO} no implementado, usando FORK`));
};

if(MODO === 'CLUSTER' && cluster.isPrimary) {
	for(let i = 0; i < nroCPUs; i++){
		cluster.fork();
	}
	cluster.on('online', (worker) => {
		logger.log('info', `Worker PID: ${worker.process.pid} is alive`);
	} );
	cluster.on('exit', (worker) => {
		logger.log("warn", `Worker PID: ${worker.process.pid} died`);
	} );
} else {
	const server = app.listen(PORT, () => {
		logger.log(
            "info",
            `Escuchando en el Puerto: ${server.address().port} - MODO: ${MODO} - PID: ${process.pid} - fyh: ${new Date().toLocaleString()}`
        );
	} );
	server.on("error", (error) => loggerError.log("error", error));
};