var winston          = require("winston")
var dailyLogRotate   = require("winston-daily-rotate-file")
var propertiesReader = require("properties-reader")
var args             = require("./cli_params")
var config           = propertiesReader(`${args.conf_dir}/application.properties`)

class Logger{
    constructor(label){
        this.zippedBool = (config.get("logging.rotation.zippedArchive") == "true"); //Convert string to boolean
        this.configParam = {
            level : config.get("logging.level"),
            format : winston.format.combine(
                winston.format.label({label: label}),
                winston.format.splat(),
                winston.format.timestamp({
                    format: config.get("logging.timestamp.format"),
                }),
                winston.format.printf(info => {
                    return `${info.timestamp} [${info.level}] ${info.label} ${info.message}`
                })
            ),
            transports: [
                new winston.transports.Console(), 
                    //new winston.transports.File({filename: config.get("logging.logfile")}),
                new winston.transports.DailyRotateFile({
                    name: 'file',
                    datePattern   : config.get("logging.rotation.datePattern"),
                    filename      : config.get("logging.logFile"),
                    maxFiles      : config.get("logging.rotation.maxFiles"),
                    zippedArchive : this.zippedBool
                })
            ]
        }
        this.logger = winston.createLogger(this.configParam)
    }

    info(message, ...params){
        if(params){
            this.logger.info(message, ...params)
            return
        }
        this.logger.info(message)  
    }

    debug(message, ...params){
        if(params){
            this.logger.debug(message, ...params)
            return
        }
        this.logger.debug(message)
    }

    error(message, ...params){
        if(params){
            this.logger.error(message, ...params)
            return
        }
        this.logger.error(message)
    }

    warn(message, ...params){
        if(params){
            this.logger.warn(message, ...params)
            return
        }
        this.logger.warn(message)
    }
}
module.exports = Logger;

//var logger = new Logger("logger.js")

