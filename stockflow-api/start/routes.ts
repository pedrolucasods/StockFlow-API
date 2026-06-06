/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('register', [controllers.AuthController, 'register'])
        router.post('login', [controllers.AuthController, 'login'])
      })
      .prefix('/auth')
    
    router
      .group(() => {
        router.patch(':id/status', [controllers.UsersController, 'update_status'] ).use(middleware.role(['admin']))
      })
      .prefix('/users')
      .use(middleware.auth())
      .use(middleware.isActive())

    router
      .group(()=>{
        router.get('', [controllers.SuppliersController, 'list'])
        router.get(':id', [controllers.SuppliersController, 'search_supplier'])
        router.post('', [controllers.SuppliersController, 'create']).use(middleware.role(['admin']))
        router.put(':id', [controllers.SuppliersController, 'update']).use(middleware.role(['admin']))
        router.delete(':id', [controllers.SuppliersController, 'delete']).use(middleware.role(['admin']))
      })
      .prefix('/suppliers')
      .use(middleware.auth())
      .use(middleware.isActive())

    router
      .group(()=>{
        router.get('', [controllers.CategoriesController, 'list']),
        router.get(':id', [controllers.CategoriesController, 'search_category']),
        router.post('', [controllers.CategoriesController, 'create']).use(middleware.role(['admin'])),
        router.put(':id', [controllers.CategoriesController, 'update']).use(middleware.role(['admin'])),
        router.delete(':id', [controllers.CategoriesController, 'delete']).use(middleware.role(['admin']))
      })
      .prefix('/categories')
      .use(middleware.auth())
      .use(middleware.isActive())

    router
      .group(()=>{
        router.get('', [controllers.ProductsController, 'list']),
        router.get(':id', [controllers.ProductsController, 'search_produtc']),
        router.post('', [controllers.ProductsController, 'create']).use(middleware.role(['admin'])),
        router.put(':id', [controllers.ProductsController, 'update']).use(middleware.role(['admin'])),
        router.delete(':id', [controllers.ProductsController, 'delete']).use(middleware.role(['admin']))
      })
      .prefix('/products')
      .use(middleware.auth())
      .use(middleware.isActive())

    router
      .group(()=>{
        router.get('', [controllers.StockMovementsController, 'list']),
        router.get(':id', [controllers.StockMovementsController, 'search_stockmovement']),
        router.post('', [controllers.StockMovementsController, 'create'])
  
      })
      .prefix('/stock-movements')
      .use(middleware.auth())
      .use(middleware.isActive())
    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
      .use(middleware.isActive())
  })
  .prefix('/api/v1')
