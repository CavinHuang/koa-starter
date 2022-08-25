import { DateFileAppender, FileAppender } from 'log4js'
import { LoggerConfig } from './types'
import { ConsoleLogger } from './adapters/ConsoleLogger'
import { DateFileLogger } from './adapters/DateFileLogger';
import { FileLogger } from './adapters/FileLogger';

type LoggerAdapter = ConsoleLogger | DateFileLogger | FileLogger
type LoggerConfination<T> = T extends DateFileLogger ? Partial<DateFileAppender> : T extends FileLogger ? Partial<FileAppender> : LoggerConfig
type ClassStruct<T> = (new (...args: any[]) => T )
type HandlerType<T> = [T] extends [ConsoleLogger] ? ConsoleLogger : 
                        [T] extends [DateFileLogger] ? DateFileLogger : 
                          [T] extends [FileLogger] ? FileLogger : 
                            ConsoleLogger

export class Logger<T extends LoggerAdapter> {
  private _logger: HandlerType<T>
  private status: 'close' | 'open'

  constructor(config: LoggerConfination<T> & { status: 'close' | 'open' }, adapter?: T) {
    const handler = (adapter || ConsoleLogger) as unknown as ClassStruct<HandlerType<T>>
    this._logger = new handler(config);
    this.status = config.status
  }

  get loggerStatus() {
    return this.status === 'open'
  }

  private checkLevelHandler(level: "trace" | "debug" | "info" | "warn" | "error" | 'fatal') {
    if (!this._logger[level]) throw new Error(`loger adapter ${level} not exist!`)
  }

  public trace(message: any, ...args: any[]) {
    if (!this.loggerStatus) return
    this.checkLevelHandler('trace')
    this._logger.trace.call(this._logger, message, ...args)
  }

  public debug(message: any, ...args: any[]) {
    if (!this.loggerStatus) return
    this.checkLevelHandler('debug')
    this._logger.debug.call(this._logger, message, ...args)
  }

  public info(message: any, ...args: any[]) {
    if (!this.loggerStatus) return
    this.checkLevelHandler('info')
    this._logger.info.call(this._logger, message, ...args)
  }

  public warn(message: any, ...args: any[]) {
    if (!this.loggerStatus) return
    this.checkLevelHandler('warn')
    this._logger.warn.call(this._logger, message, ...args)
  }

  public error(message: any, ...args: any[]) {
    if (!this.loggerStatus) return
    this.checkLevelHandler('error')
    this._logger.error.call(this._logger, message, ...args)
  }

  public fatal(message: any, ...args: any[]) {
    if (!this.loggerStatus) return
    this.checkLevelHandler('fatal')
    this._logger.fatal.call(this._logger, message, ...args)
  }
}