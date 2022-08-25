import Koa from 'koa';
import koaBody from 'koa-body'
import koaCors from '@koa/cors'

import { corsAllow } from './corsAllow';
import { requestError } from './requestError';
import { requestLog } from './requestLogger';


/**
 * middleware
 * @param app 
 */
export const useMiddlewares = (app: Koa) => {
  app.use(corsAllow())
     .use(koaBody())
     .use(koaCors())
     .use(requestLog())
     .use(requestError())
}