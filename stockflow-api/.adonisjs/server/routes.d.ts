import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'suppliers.list': { paramsTuple?: []; params?: {} }
    'suppliers.search_supplier': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'suppliers.create': { paramsTuple?: []; params?: {} }
    'suppliers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'suppliers.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.list': { paramsTuple?: []; params?: {} }
    'categories.search_category': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.list': { paramsTuple?: []; params?: {} }
    'products.search_produtc': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.create': { paramsTuple?: []; params?: {} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'suppliers.list': { paramsTuple?: []; params?: {} }
    'suppliers.search_supplier': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.list': { paramsTuple?: []; params?: {} }
    'categories.search_category': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.list': { paramsTuple?: []; params?: {} }
    'products.search_produtc': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'suppliers.list': { paramsTuple?: []; params?: {} }
    'suppliers.search_supplier': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.list': { paramsTuple?: []; params?: {} }
    'categories.search_category': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.list': { paramsTuple?: []; params?: {} }
    'products.search_produtc': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'suppliers.create': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'products.create': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'suppliers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'suppliers.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}