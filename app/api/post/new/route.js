import Post from "@models/post";
import { connectToDB } from "@utils/database";


export const POST = async(req) =>{
    const{userId, prompt , tag} = await req.json();

    try {
        
       
        await connectToDB();

        const newPost = new Post({ creator: userId, prompt, tag });
        
        await newPost.save();

        return new Response(JSON.stringify(newPost),{status:201});
        
    } catch (error) {
        new Response('Failed to create new',{status:500 })
        
    }
}

