const Router = require('koa-router');
const os = require('os');

var hbs = require('koa-hbs');


const routerInfo = new Router();

const info = {
    "Argumentos de entrada": process.argv,
    "Nombre de la plataforma": process.platform,
    "Versión de Node.js": process.version,   
    "Path de ejecución": process.execPath,
    "Memoria total de reservada": process.memoryUsage().rss,
    "Process ID": process.pid,
    "Directorio actual del trabajo": process.cwd(),
}

routerInfo.get('/info', async (ctx) => {
    const PORT = ctx.socket.port;
    const infoProyecto = {
        rgumentos: process.argv, // "Argumentos de entrada": process.argv,
        plataforma: process.platform, // "Nombre de la plataforma": process.platform,
        versionNode: process.version, // "Versión de Node.js": process.version,
        pathEjecucion: process.execPath, // "Path de ejecución": process.execPath,
        memoriaTotalReservada: Math.floor(process.memoryUsage().rss / (1024 * 1024)), // "Memoria total de reservada": process.memoryUsage().rss,
        processId: process.pid, // "Process ID": process.pid,
        directorioActualTrabajo: process.cwd(), // "Directorio actual del trabajo": process.cwd(),
        numProcesadores: os.cpus().length, // "Número de procesadores": os.cpus().length,
        PORT: PORT,
    }
    ctx.response.body =  ctx.render('info', {infoProyecto})
})



module.exports = routerInfo;