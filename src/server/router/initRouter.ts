import { Application } from "../application";
import router from './router'
import { readdirRecursive } from '@/utils/file';
import path from "path";
import { AppContext } from '@/types/application';
import { Next } from "koa";
import { Response } from "../response";
import { CONTROLLER_ROOT, LoggerNameSpace } from "@/constants";

interface IRouterMate {
  routePath: string
  pathApi: string
}

/**
 * 初始化路由挂载
 * @param app 
 * @returns 
 */
export function initRouter(app: Application) {
  const methodsRouter = (router as any).methods.map((m: string) => m.toLowerCase())

  /**
   * 收集controller
   * @param controllerPath 
   */
  async function importControllerFiles(controllerPath: string) {
    const controllerFiles = readdirRecursive(controllerPath).filter((filePath) => {
      return filePath.endsWith('.api.ts')
    })

    const routerMeta: IRouterMate[] = []
    controllerFiles.forEach(fileApi => {
      const infoApi = path.parse(fileApi)
      const pathApi = path.join(controllerPath, fileApi)
      const routePath = '/' + path.posix.join(...infoApi.dir.split(path.sep), path.basename(infoApi.base, '.api.ts'))

      routerMeta.push({
        routePath,
        pathApi
      })
    })

    for (let i = 0; i < routerMeta.length; i++) {
      const item = routerMeta[i]
      await controllerMounter(item.routePath, item.pathApi)
    }
  }

  /**
   * 过滤掉路由不允许的路由方法
   * @param methods 
   */
  function filterRouteMethod(methods: string[]) {
    return methods.map(method => method.toLowerCase()).filter(method => methodsRouter.includes(method))
  }

  /**
   * 挂载controller
   * @param routePath 
   * @param controllerPath 
   */
  async function controllerMounter(routePath: string, controllerPath: string) {
    const controller = (await import(controllerPath)).default
    const controllerInstance = new controller()

    const instanceMethod = controllerInstance.method
    // 获取当前api请求的方法
    const methods = instanceMethod ? Array.isArray(instanceMethod) ? filterRouteMethod(instanceMethod) : filterRouteMethod([instanceMethod]) : ['get']

    for (const method of methods) {
      mountControllerWithRouter(method, controllerInstance, routePath)
    }
  }

  /**
   * 把controller和路由挂起来
   * @param method 
   * @param controller 
   * @param routePath 
   */
  function mountControllerWithRouter(method: string, controller: any, routePath: string) {
    // 这里可以加载一些前置的中间件

    // 加载路由
    ;(router as any)[method](routePath, async (ctx: AppContext, next: Next) => {
      try {
        const params = {
          ...ctx.query,
          ...ctx.request.body
        }
        const responceRes = await controller.handler(params, ctx.$)
        if (responceRes !== undefined) {
          ctx.body = responceRes
          return await next()
        }
        ctx.status = 404
        ctx.body = Response.error('没有你要访问的内容')
      } catch (error) {
        const err = error instanceof Error ? error : new Error(error as string)
        ctx.status = 500
        ctx.body = Response.error(err.message, err.stack)
      }
      await next()
    })

    // 这里可以放一些后置处理的中间件

    // 记录一条日志
    app.logger.info(LoggerNameSpace.App, `✔ 加载 ~[HTTP接口]~{${method}}~{${routePath}}`)
  }

  importControllerFiles(CONTROLLER_ROOT).then(() => {
    app.app.use(router.routes())
  }) 
}