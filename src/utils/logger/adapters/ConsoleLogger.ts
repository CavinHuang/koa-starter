import { Base } from "./Base"
import { LoggerConfig, LoggerLevel } from '../types'

export class ConsoleLogger extends Base {
  formatConfig(config: LoggerConfig) {
    let { level, layout } = config
    level = (level ? level.toUpperCase() : 'ALL') as LoggerLevel
    layout = layout || { type: 'pattern', pattern: '%[[%d] [%z] [%p]%] - %m' }

    return Object.assign({
      appenders: {
        console: {type: 'console', layout}
      },
      categories: {
        default: {appenders: ['console'], level}
      }
    }, config)
  }
}

export const consoleConfig = (config: LoggerConfig) => {
  let { level, layout } = config
    level = (level ? level.toUpperCase() : 'ALL') as LoggerLevel
    layout = layout || { type: 'pattern', pattern: '%[[%d] [%z] [%p]%] - %m' }

    return Object.assign({
      appenders: {
        console: {type: 'console', layout}
      },
      categories: {
        default: {appenders: ['console'], level}
      }
    }, config)
}