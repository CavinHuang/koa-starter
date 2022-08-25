import { ILoggerConfig, loggerConfig } from "@/config"
import { DateFileLogger, Logger } from "@/utils"

export type ApplicationLogger = Logger<DateFileLogger>

/**
 * 全局保存实例，避免重复实例化
 */
let globalLogger: ApplicationLogger | null = null

export const createLogger = (config: ILoggerConfig, name: string = 'app') => {
  if (globalLogger) return globalLogger
  const handler = config.handler
  delete config.handler

  globalLogger = new Logger<DateFileLogger>(config, handler)
  return globalLogger
}

export const logger = createLogger(loggerConfig)