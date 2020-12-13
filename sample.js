var Logger = require("./logger")
var logger = new Logger("lib/sample.js")

logger.info("Hello Javascript")
logger.debug("Hello %s", "Golang")

var p_language = "Java"
logger.warn("Hello ${p_language}")

/*
---------------- Output --------------------------------
2020-12-13 12:07:21 [info] lib/sample.js Hello Javascript
2020-12-13 12:07:21 [debug] lib/sample.js Hello Golang
2020-12-13 12:07:21 [warn] lib/sample.js Hello Java
*/
