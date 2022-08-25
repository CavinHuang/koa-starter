/**
 * 封装一个抽象的核心controller
 */

import { Response } from "@/server";

/**
 * 核心抽象类
 */
export abstract class BaseController {

  /**
   * 请求方法枚举
   */
  public METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT'
  }

  /**
   * 指定当前api的请求方式
   */
  public abstract method: string | string[]

  /**
   * 指定当前api必须完成方法
   * @param params 
   */
  public abstract handler(params?: Record<string, any>): Response
}