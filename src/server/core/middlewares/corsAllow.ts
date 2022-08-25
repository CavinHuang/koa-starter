import { Context, Next } from "koa"

/**
 * 跨域请求
 * @returns 
 */
export const corsAllow = () => {
  return async (ctx: Context, next: Next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    )
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    if (ctx.method === 'OPTIONS') {
      ctx.body = 200
    } else {
      await next()
    }
  }
}