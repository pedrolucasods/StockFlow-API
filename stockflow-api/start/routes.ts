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
      .group(()=>{
        router.get('', [controllers.SuppliersController, 'list'])
        router.get(':id', [controllers.SuppliersController, 'search_supplier'])
        router.post('', [controllers.SuppliersController, 'create']).use(middleware.role(['admin']))
        router.put(':id', [controllers.SuppliersController, 'update']).use(middleware.role(['admin']))
        router.delete(':id', [controllers.SuppliersController, 'delete']).use(middleware.role(['admin']))
      })
      .prefix('/suppliers')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
