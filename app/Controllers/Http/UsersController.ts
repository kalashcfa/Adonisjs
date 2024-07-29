import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";

export default class UsersController {


    public async render_register_page({view})
    {
        return view.render('user/register')
    }


    public async register({ request , response }:HttpContextContract)
    {
        const {name , email , password} = request.only(['name' , 'email' , 'password'])
         
        await User.create({
            name,
            email,
            password
        });
        return response.redirect('/login')
    }

    public async login_render({view})
    {
        return view.render('user/login');
    }

    public async find_user( {request , auth , response } )
    {
        const email = request.input('email');

        const password = request.input('password');

        await request.validate(UserValidator)

        await auth.use('web').attempt(email , password)
        const user = auth.user!;

        return response.redirect('/post',{user})
    }

     public async logout({auth , response , request})
    {
        await auth.use('web').logout();

        response.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.header('Pragma', 'no-cache');
        response.header('Expires', '0');

        const redirectUrl = request.header('referer') || '/login';
            
        return response.redirect(redirectUrl)
    }

    
}
