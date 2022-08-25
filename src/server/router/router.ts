import { application } from '@/config';
import Router from 'koa-router'

const router = new Router({
  prefix: application.routerPrefix || '/'
})

router.allowedMethods()

export default router