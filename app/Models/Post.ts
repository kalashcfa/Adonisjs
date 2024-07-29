import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public title: string

  @column()
  public slug : string

  @column()
  public content: string

  @column()
  public image: string


  @column()
  public userId : number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>User , {
    foreignKey:'userId'
  })
  public user : BelongsTo<typeof User>

  @beforeCreate()
    public static CreateSlug(article : Post)
    {
      article.slug = article.$dirty.title.toLowerCase().replace(/\s+/g, '-')+ +new Date()
    } 
}