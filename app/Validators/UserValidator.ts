import { schema, CustomMessages ,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create
  ({
    email: schema.string([
      rules.email(),
      rules.exists({table:'users' , column:'email'})
    ]),
    password : schema.string(),
  })

  public static messages : CustomMessages = 
  {
    "email.required" : 'email is required',
    "email.email" : 'please provide a valid email !',
    "password.required" : '**password is required '
  }
}
