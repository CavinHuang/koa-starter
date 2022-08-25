import { Middleware, Next } from 'koa'
import { AppContext } from '@/types'

export const requestLog =  ():Middleware<any, AppContext, Record<string, any>> => async (ctx: AppContext, next: Next) => {
  await next()
  // 记录请求和响应日志
  ctx.logger.info(`
    ======>
    timestamp: ${new Date()}
    request method: ${ctx.method}
    request url: ${ctx.path}
    request query: ${JSON.stringify(ctx.query)}
    request body: ${JSON.stringify(ctx.request.body)}
    <======
    response body: ${JSON.stringify(ctx.body)}
  `)
}