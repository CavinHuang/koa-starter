import Koa from 'koa';
import koaBody from 'koa-body'
import koaCors from '@koa/cors'

import { requestError } from './requestError';
import { requestLog } from './requestLogger';


/**
 * middleware
 * @param app 
 */
export const useMiddlewares = (app: Koa) => {
  app.use(koaBody())
     .use(koaCors({
      allowHeaders: 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
      allowMethods: 'PUT, POST, GET, DELETE, OPTIONS',
      origin: '*'
     }))
     .use(requestLog())
     .use(requestError())
}