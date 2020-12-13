var Logger           = require("./logger")
var logger           = new Logger("lib/sample.js")

logger.info("Hello Javascript")
logger.debug("Hello %s", "Golang")

var p_language = "Java"
logger.warn("Hello ${p_language}")
