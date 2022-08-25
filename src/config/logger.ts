/**
 * 日志配置
 */

import { APP_ROOT } from "@/constants";
import { DateFileLogger } from "@/utils/logger"
import { DateFileAppender } from 'log4js';
import path from 'path';

export type ILoggerConfig = Partial<DateFileAppender> & {
  handler: any
  status: 'close' | 'open'
}

/**
 * 日志配置
 */
export const loggerConfig: ILoggerConfig = {
  handler: DateFileLogger,
  filename: path.resolve(APP_ROOT, 'logs/logs.log'),
  pattern: '-yyyy-MM-dd',
  alwaysIncludePattern: false,
  status: 'open'
}