import type { Configuration, Levels, CustomLayout } from 'log4js'

export type LoggerLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'

export type LoggerConfig = Configuration & { level: LoggerLevel; layout: CustomLayout; absolute: boolean }