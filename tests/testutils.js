// We won´t use fs promises because in windows 10 and Ubuntu writefile breaks promises in node 12
// we will use the standard callback version and promisify it
// const fs = require('fs').promises;
const fs = require("fs");
const path = require("path");

const {promisify} = require("util");
const access = promisify(fs.access);

const REG_URL = /(\b(http|ftp|https|ftps):\/\/[-A-ZáéíóúÁÉÍÓÚ0-9+&@#\/%?=~_|!:,.;]*[-A-ZáéíóúÁÉÍÓÚ0-9+&@#\/%=~_|])/ig;

const DEBUG =  typeof process.env.DEBUG !== "undefined";
const LOG_SERVER =  typeof process.env.LOG_SERVER !== "undefined";
const WAIT =  typeof process.env.WAIT !== "undefined"?parseInt(process.env.WAIT):50000;
const TIMEOUT =  typeof process.env.TIMEOUT !== "undefined"?parseInt(process.env.TIMEOUT):2000;
const TEST_PORT =  typeof process.env.TEST_PORT !== "undefined"?parseInt(process.env.TEST_PORT):3001;
const FILTER = new RegExp(process.env.TESTFILTER, "i");
const PATH_ASSIGNMENT = typeof process.env.PATH_ASSIGNMENT !== "undefined"?process.env.PATH_ASSIGNMENT:path.resolve(path.join(__dirname, "../"));

// CRITICAL ERRORS. Si hay errores críticos, el resto de tests no se lanzan.
let error_critical = null;
let error_any = null;

const TestUtils = {};


TestUtils.checkFileExists = async (filepath) => {
    try {
        await access(filepath, fs.F_OK);
        return true;
    } catch (err) {
        return false;
    }
};

TestUtils.to = (promise) => promise.
    then((data) => [
        null,
        data
    ]).
    catch((err) => [err]);

TestUtils.getURL = (string) => {
    const urls = string.match(REG_URL);
    let url = null;

    if (urls instanceof Array) {
        [url] = urls;
    }
    return url;
};

// eslint-disable-next-line no-undefined
TestUtils.exists = (thing) => thing !== undefined && thing !== null;

TestUtils.isString = (thing) => typeof thing === "string" || thing instanceof String;

TestUtils.isObject = (thing) => typeof thing === "object" || thing instanceof Object;

TestUtils.isNumber = (thing) => {
    let number = false;

    if (TestUtils.exists(thing)) {
        number = typeof parseInt(thing, 10) === "number";
    }
    return number;
};

TestUtils.isArray = (thing) => thing instanceof Array;

TestUtils.isURL = (thing) => {
    if (TestUtils.isString(thing)) {
        return REG_URL.test(thing);
    }
};

TestUtils.isRegExp = (thing) => thing instanceof RegExp;

TestUtils.isJSON = (thing) => {
    try {
        JSON.parse(thing);
        return true;
    } catch (e) {
        return false;
    }
};

TestUtils.search = (b, a) => {
    if (TestUtils.isRegExp(b)) {
        if (TestUtils.isString(a) && a.length > 0) {
            return b.test(a);
        }
        return false;
    }
    if (TestUtils.isArray(a)) {
        let result = false;

        for (const item in a) {
            if (TestUtils.search(b, a[item])) {
                result = true;
            }
        }
        return result;
    }
    if (TestUtils.isString(a.toString())) {
        return a.toString().toLowerCase().
            indexOf(b.toLowerCase()) > -1;
    }
};




// Monkey-patching del método it para no repetir código, y manejar mejor los errores en el desarrollo del test.
var orig_it = it;
var num_tests = 1;

TestUtils.critical = function(name, score, func) {
    return TestUtils.scored(name, -1, func);
};

TestUtils.scored = function(name, score, func) {
    name = `${num_tests}: ${name}`;
    num_tests++;
    return orig_it(name, async function () {
        let critical = score < 0;
        this.score = critical? 0 :score;
        this.msg_ok = null;
        this.msg_err = null;
        if(error_critical) {
            this.msg_err = "Un test crítico ha fallado, no podemos continuar hasta que pasen todos los tests críticos.";
            throw Error(this.msg_err);
        } 
        if(FILTER && !FILTER.test(name)) {
            console.log(`Ignorando este test, de acuerdo con los filtros de test: ${FILTER}`);
            return;
        }

        try {
            let res = await func.apply(this, []);
            if (!this.msg_ok){
                this.msg_ok =  "¡Enhorabuena!";
            }
            return;
        } catch(e){
            TestUtils.log("Exception in test:", e);
            error_any = true;
            if (!this.msg_err){
                this.msg_err =  "";
            }
            if (critical) {
                console.log('Se ha producido un error crítico, se cancelan el resto de tests.')
                error_critical = this.msg_err;
            }
            throw(e);
        }
    });
};

// TODO: Integrar bien con un logger
TestUtils.log = function () {
    if(DEBUG) {console.log.apply(this, arguments );}
};

TestUtils.path_assignment = PATH_ASSIGNMENT;

TestUtils.warn_errors = function() {
    if(error_any || error_critical) {
        console.log(`Algún error de Javascript ha sido suprimido. Puedes obtener más información de los errores lanzando el autocorector con la variable DEBUG. Por ejemplo:

    DEBUG=1 autocorector

    Cuando preguntes en el foro, asegúrate de incluir esa información para que podamos ayudarte.
    `);
    }
};


TestUtils.create_browser = function(url, wait=WAIT) {
    return new Browser({"waitDuration": wait, "silent": true, "runScripts": false });
};

module.exports = TestUtils;
