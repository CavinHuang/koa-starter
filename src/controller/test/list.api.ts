import { Response } from "@/server"
import { BaseController } from "../BaseController"
import { Post, Get } from '@/server'
import { AppContext } from '@/types';

/**
 * 测试api
 */
export default class Test extends BaseController {

  @Post('/testPost')
  public testPost(ctx: AppContext) {
    return Response.success(ctx.request.body)
  }

  @Get('/testGet')
  public testGet(ctx: AppContext) {
    return Response.success(ctx.request.query)
  }

  @Get('/test/get')
  public test2path () {
    return Response.success('success')
  }
}