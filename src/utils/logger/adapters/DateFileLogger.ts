import { DateFileAppender } from 'log4js'
import { Base } from "./Base"
import { LoggerConfig, LoggerLevel } from "../types"

/**
 * date file适配器
 */
export class DateFileLogger extends Base {
  formatConfig(config: LoggerConfig & DateFileAppender) {
    let { level, filename, pattern, alwaysIncludePattern, absolute, layout, mode, numBackups } = config
    level = (level ? level.toUpperCase() : 'ALL') as LoggerLevel
    layout = layout || { type: 'pattern', pattern: '%[[%d] [%z] [%p]%] - %m' }

    return Object.assign({
      appenders: {
        console: {type: 'console', layout},
        dateFile: {type: 'dateFile', filename, pattern, alwaysIncludePattern, absolute, layout, mode, numBackups}
      },
      categories: {
        default: { appenders: ['dateFile', 'console'], level }
      }
    }, config)
  }
}