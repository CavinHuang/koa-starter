/**
 * 请求错误
 */
import {Middleware} from 'koa'
import { Response } from '../../response'

export const requestError = ():Middleware => async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    const { message, stack } = err as Error
    ctx.body = Response.error(message, process.env.NODE_ENV === 'development' ? stack : null, 500)
  }
}