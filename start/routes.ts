/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

// import { Router } from '@adonisjs/core/build/standalone';
import Route from '@ioc:Adonis/Core/Route'
// import View from '@ioc:Adonis/Core/View';

Route.group(()=>
    {
        Route.resource('post' , 'PostsController')
        .paramFor('post' , 'slug')
        Route.get('/profile' ,async({view})=>
            {
                return await view.render('posts/profile')
            })
        }).middleware('auth')
        
Route.get('/',('UsersController.render_register_page')).as('user.register')

Route.post('/register', ('UsersController.register')).as('store');

Route.get('/login',('UsersController.login_render')).as('login_render')

Route.post('/user_login', ('UsersController.find_user')).as('login');

Route.post('/logout' , ('UsersController.logout')).as('logOut')






// Route.get('/home' , ('PostsController.home')).as('view.article')

// Route.get('/render_article',('PostsController.render')).as('post.render')

// Route.post('/addArticle' , ('PostsController.store')).as('store.post')

// ----------------------------------------------------------------------------------------------------------

// google Authentication

// Route.get('/:provider/redirect', ('AuthSocialController.redirect')).as('auth.social.redirect');
// Route.get('/:provider/callback', ('AuthSocialController.callback')).as('auth.social.callback');
