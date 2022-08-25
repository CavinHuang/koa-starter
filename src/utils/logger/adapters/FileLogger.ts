import { FileAppender } from "log4js"
import { LoggerConfig, LoggerLevel } from "../types"
import { Base } from "./Base"

/**
 * 文件适配器
 */
export class FileLogger extends Base {
  formatConfig(config: LoggerConfig & FileAppender) {
    let { level, filename, maxLogSize, backups, absolute, layout, mode } = config
    level = (level ? level.toUpperCase() : 'ALL') as LoggerLevel

    return Object.assign({
      appenders: {
        file: {type: 'file', filename, maxLogSize, backups, absolute, layout, mode}
      },
      categories: {
        default: { appenders: ['file'], level }
      }
    }, config)
  }
}