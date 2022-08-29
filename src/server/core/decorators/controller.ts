import 'reflect-metadata'
import router from '@/server/router/router'
import { logger, Response } from '@/server'
import { AppContext } from '@/types'
import { Next } from 'koa'
import { isDev } from '@/config'

export function Controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    const handlerKeys = Object.getOwnPropertyNames(target.prototype).filter(
      key => key !== 'constructor'
    )
    handlerKeys.forEach(key => {
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: string = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      )

      const handler = target.prototype[key]

      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        // 加载一些前置公共中间件
        ;(router as any)[method](fullPath, async (ctx: AppContext, next: Next) => {
            try {
              const result = await handler(ctx)
              ctx.body = result
            } catch (e) {
              console.log(e)
              const err = e as Error
              ctx.body = Response.error(err.message, isDev ? err.stack : null, 500)
            }
        })
        // 加载一些后置公共中间件

        // 打一条日志
        logger.warn(`✔ 加载 ~[HTTP接口]~{${method}}~{${fullPath}}`)
      }
    })
  }
}