import Koa from 'koa'
import { createServer, Server } from 'http'

import { CONTROLLER_ROOT, LoggerNameSpace, NOT_FOUND_APPLICATION_CONFIG } from '@/constants'
import { ApplicationLogger, createLogger } from './logger'
import { useMiddlewares } from './core/middlewares/useMiddlewares'
import { AppContext, Config } from '@/types'
import { loggerConfig } from '@/config'
import { initRouter } from './router'

/**
 * 应用
 */
export class Application {
  public app: Koa
  public config: Config.Application
  public server: Server
  public logger: ApplicationLogger

  constructor(config: Config.Application) {
    if (!config) throw TypeError(NOT_FOUND_APPLICATION_CONFIG)
    this.config = config
    this.app = new Koa()
    this.server = createServer(this.app.callback())
    this.logger = createLogger(loggerConfig)

    this.useMiddleware()
    this.mountRouter()
  }

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

  mountRouter() {
    initRouter(this)
  }
}