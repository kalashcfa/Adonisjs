import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// import View from "@ioc:Adonis/Core/View";
import Database from "@ioc:Adonis/Lucid/Database";
import Post from 'App/Models/Post';
// import User from 'App/Models/User';
import PostValidator from "App/Validators/PostValidator";

export default class postsController {

    // show all posts / home posts
    public async index({view , request})
    {
        const page = request.input('page', 1);
        const limit = 5;

        const posts = await Database.from('posts').orderBy('created_at' , 'desc').paginate(page , limit)
        posts.baseUrl('/posts')

        return view.render("posts/home_page", { posts })
    }

    // show only perticular / only selected posts
    public async show({ params ,view })
    {
        const article = await Post.findBy('slug', params.slug);
        return view.render('posts/showArticle',{ article } )
    }

    // creating a posts page
    public async create({view})
    {
        return view.render('posts/addarticle')
    }

    // creating & storing a posts 
    public async store({ request , response })
    {
        const paylode = await request.validate(PostValidator)
        await Post.create(paylode);

        return response.redirect().toPath('/post')  
    }

    // selecting a posts to edit
    public async edit ({view , params , request})
    {
        const { slug } = params ;
        const user = await request.only(['user_id'])
        const post = await Post.findBy('slug' , slug)
        return view.render('posts/editArticle' ,{ post ,user });
    }

    // store the updated posts
    public async update ({request , response ,params}:HttpContextContract)
    {
        const paylode = await request.validate(PostValidator)
        await Post
            .query()
            .where('slug' , params.slug)
            .update(paylode)

        return response.redirect().toPath('/posts')
    }

    // deleating a posts
    public async destroy({  response , params})
    {
        const user = await Post.findBy('id' , params.id)
        if(user)
        {
            user.delete()
             return response.redirect().toPath('/posts')
        }
    }
}
