import { Response } from "@/server"
import { BaseController } from "../BaseController"

interface IParams {
  name: string
}

/**
 * 测试api，请求地址：router.prefix + /test/list
 */
export default class Test extends BaseController{
  
  public method = this.METHODS.GET
  
  public handler<IParams>(params: IParams) {
    return Response.success(params, '成功')
  }
}