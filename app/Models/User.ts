import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import Post from './Post';
import Hash from '@ioc:Adonis/Core/Hash';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public googleAccessToken: string;

  @hasMany(() => Post,{
    foreignKey:'userId',
  })
  public posts: HasMany<typeof Post>;

  // Runs before creating and updating the model
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
