//GET (read)
    import Post from "@models/post";
    import { connectToDB } from "@utils/database";

    export const GET = async (request,{params}) =>{
        try {
            await connectToDB();
            
            const post = await Post.findById(params.id).populate
            ('creator');

            if(!post){
                return new Response("Posts not found",{status:400});
            }


            return new Response(JSON.stringify(post),{status: 200})
        } catch (error) {
            return new Response('Failed to fetch all posts',{status: 500})
            
        }
    }

//PATCH(update)
export const PATCH = async (request,{params}) =>{ 
   
    const {prompt,tag } = await request.json();
    try {
            await connectToDB();
            const existingPost = await Post.findById(params.id);
             
            if(!existingPost)
            {
                return new Response("Post not found",{status:404}); 
            }
            existingPost.prompt  = prompt;
            existingPost.tag = tag;

            await existingPost.save();
    } catch (error) {
        return new Response('Failed to update post',{status:500});
    }
}


//Delete(delete)
export const DELETE = async(request,{params}) =>{
    
   try 
    {   
        await connectToDB();
       await Post.findByIdAndRemove(params.id);
       return new Response("Post deleted",{status:200})
        
   } catch (error) {
        return new Response("Failed to delete post",{status:500});
   }
}
   
