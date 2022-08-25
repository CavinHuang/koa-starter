import { Application } from '@/server';
import { ApplicationLogger } from '@/server/logger';
import { Context, Request } from 'koa';

export type AppRequest = Request & { body: Record<string, any> }

export type AppContext = Context & { 
  request: AppRequest
  logger: ApplicationLogger
  server: Application
  $: Application
}