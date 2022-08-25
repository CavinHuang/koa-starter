import log4js, { Configuration, Logger } from 'log4js'
const _logger = Symbol('_logger')

/**
 * log4js基础适配器
 */
export class Base {
  /**
   * logger 标记
   */
  private [_logger]: Logger | null = null

  /**
   * 构造器
   * @param config 
   */
  constructor(config: Configuration) {
    const logConfig = this.formatConfig(config)
    this.setLogger(logConfig)
  }

  /**
   * 链路日志
   * @param message 
   * @param args 
   * @returns 
   */
  trace(message: any, ...args: any[]) {
    return this[_logger] && this[_logger].trace(message, args)
  }

  /**
   * 调试日志
   * @param message 
   * @param args 
   * @returns 
   */
  debug(message: any, ...args: any[]) {
    return this[_logger]!.debug(message, ...args)
  }

  /**
   * 信息日志
   * @param message 
   * @param args 
   * @returns 
   */
  info(message: any, ...args: any[]) {
    return this[_logger]!.info(message, ...args)
  }

  /**
   * 警告日志
   * @param message 
   * @param args 
   * @returns 
   */
  warn(message: any, ...args: any[]) {
    return this[_logger]!.warn(message, ...args)
  }

  /**
   * 错误日志
   * @param message 
   * @param args 
   * @returns 
   */
  error(message: any, ...args: any[]) {
    return this[_logger]!.error(message, ...args)
  }

  /**
   * 致命错误日志
   * @param message 
   * @param args 
   * @returns 
   */
  fatal(message: any, ...args: any[]) {
    return this[_logger]!.fatal(message, ...args)
  }


  /**
   * log4js 配置加载
   */
  configure(config: Configuration) {
    return log4js.configure(config)
  }

  /**
   * log4js 获取log4js的实例
   */
  setLogger(config: Configuration, category?: string) {
    this.configure(config)
    this[_logger] = log4js.getLogger(category)
  }

  /**
   * 格式化配置
   * @param config 
   * @returns 
   */
  formatConfig(config: Configuration) {
    return config
  }
}