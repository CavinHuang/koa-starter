export const MEATADATA_TAGS = {
  /**
   * 路由前缀
   */
  ROUTE_PREFIX: Symbol('ROUTE_PREFIX'),
  /**
   * 路由路径
   */
  ROUTE_PATH: Symbol('ROUTE_PATH'),
  /**
   * 路由参数
   */
  ROUTE_PARAMS: Symbol('ROUTE_PARAMS'),
  /**
   * 路由参数类型
   */
  ROUTE_PARAMS_TYPE: Symbol('design:paramtypes'),
  /**
   * api controller配置
   */
  API_CONTROLLER_OPTIONS: Symbol('API_CONTROLLER_OPTIONS'),
  /**
   * api方法配置
   */
  API_METHOD_OPTIONS: Symbol('API_METHOD_OPTIONS'),
  RENDER_TEMPLATE: 'RENDER_TEMPLATE'
}

export const ROUTE_PARAMS_SOURCE = {
  QUERY: Symbol('QUERY'),
  BODY: Symbol('BODY'),
  PARAMS: Symbol('PARAMS')
}