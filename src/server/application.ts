import Koa from 'koa'
import { createServer, Server } from 'http'

import { LoggerNameSpace, NOT_FOUND_APPLICATION_CONFIG } from '@/constants'
import { ApplicationLogger, createLogger } from './logger'
import { useMiddlewares } from './core/middlewares/useMiddlewares'
import { loggerConfig } from '@/config'
import { importController } from './router'

import type { AppContext, Config } from '@/types'
import router from './router/router'

/**
 * 应用
 */
export class Application {
  /**
   * koa实例
   */
  public app: Koa

  /**
   * 服务配置
   */
  public config: Config.Application
  
  /**
   * 服务实例
   */
  public server: Server

  /**
   * 日志实例
   */
  public logger: ApplicationLogger

  /**
   * 构造函数
   * @param config 
   */
  constructor(config: Config.Application) {
    if (!config) throw TypeError(NOT_FOUND_APPLICATION_CONFIG)
    this.config = config
    this.app = new Koa()
    this.server = createServer(this.app.callback())
    this.logger = createLogger(loggerConfig)

    importController()
    this.mountRouter()
    this.useMiddleware()
  }

  /**
   * 挂载中间件
   */
  useMiddleware() {
    // 做一些对象的挂载方便后续使用
    this.app.use(async (ctx: AppContext, next) => {
      ctx.$ = ctx.server = this
      ctx.logger = this.logger
      await next()
    })

    // 挂载中间件
    useMiddlewares(this.app)
  }

  /**
   * 启动服务
   */
  start() {
    const { host, port } = this.config
    try {
      this.server.listen(port, host, () => {
        this.logger.info(LoggerNameSpace.App, `服务已运行在http://${host}:${port}`, '✔ ')
      })
    } catch (error) {
      this.logger.fatal(LoggerNameSpace.App, `服务http://${host}:${port}启动失败!`, error)
    }
  }

  /**
   * 挂载路由
   */
  mountRouter() {
    this.app.use(async (ctx: AppContext, next) => {
      ctx.$ = this
      ctx.server = this
      await next()
    })
    this.app.use(router.routes()).use(router.allowedMethods())
  }
}