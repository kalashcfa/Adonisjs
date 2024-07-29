import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

import AuthSocialService from "App/services/AuthSocialService";
@inject()
export default class AuthSocialsController {
    constructor(public authsocialservice : AuthSocialService){}


    public async redirect ({ ally , params }:HttpContextContract)
    {
        await ally.use(params.provider).redirect();
    }

    public async callback({ response , auth , params }: HttpContextContract)
    {
        const { isSuccess,user} = await this.authsocialservice.getUser(params.provider)

        if(!isSuccess)
        {
            return response.redirect().toRoute('user.register')
        }

         await auth.use('web').login(<User>user)

         const hasUser = await User.findBy('userId', user?.id)
         if(!hasUser)
         {
            await User.create({ id : user?.id})
         }
         response.redirect('/')
    }
}
