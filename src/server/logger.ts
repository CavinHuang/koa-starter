import { ILoggerConfig, loggerConfig } from "@/config"
import { DateFileLogger, Logger } from "@/utils"
import Chalk from 'chalk'
import Dayjs from "dayjs"
import { LoggingEvent, Configuration } from 'log4js'

export type ApplicationLogger = Logger<DateFileLogger>

/**
 * 全局保存实例，避免重复实例化
 */
let globalLogger: ApplicationLogger | null = null

const highlight = (str: string): string => {
  return String(str)
    .replace(/~\[(.*?)\]/g, Chalk.underline.bold('$1'))
    .replace(/~\{(.*?)\}/g, Chalk.white('[$1]'))
}

function initFormattLog() {
  return function formattLog({ startTime, level: { colour, levelStr }, data: datas }: LoggingEvent, isHightlight: boolean) {
    if (!datas.length) {
      return ['']
    }

    const color = colour
    const level = levelStr
    const time = Dayjs(startTime).format('YY-MM-DD HH:mm:ss:SSS')
    const texts = []
    const errors = []
    for (let i = 2; i < datas.length; i++) {
      const data = datas[i]

      if (data === undefined) {
        continue
      }

      if (data instanceof Error || (data.stack && data.message)) {
        errors.push(data)

        texts.push(String(data.message))
      } else if (data.message) {
        texts.push(String(data.message))
      } else {
        texts.push(String(data))
      }
    }
    let where = datas[0]
    let action = datas[1]
    let resultAll = texts.join('\n\t')

    if (isHightlight) {
      where = highlight(where)
      action = highlight(action)
      resultAll = highlight(resultAll)
    }

    let logFinal = `[${time}][${level}] ${where}` + (action ? ` >  ${action}` : '') + (resultAll ? `  ${resultAll}` : '')
    if (isHightlight) {
      logFinal = (Chalk as any)[color](logFinal)
    }

    const logError = [
      logFinal,
      '-------------- Stack --------------',
      errors
        .map(
          (error) =>
            (isHightlight ? (Chalk as any)[color](highlight(error.message)) : error.message) +
            (error.stack ? `\n${String(error.stack).replace(/ {4}/g, '\t')}` : '') +
            (error.data ? `\n[Data] ${error.data}` : '')
        )
        .join('\n--------------\n'),
      '===================================\n'
    ].join('\n')

    return errors.length ? [logFinal, logError] : [logFinal]
  }
}

export const createLogger = (config: ILoggerConfig, name: string = 'app') => {
  if (globalLogger) return globalLogger
  const handler = config.handler
  delete config.handler

  globalLogger = new Logger<DateFileLogger>(config, handler)
  return globalLogger
}

export const logger = createLogger(loggerConfig)