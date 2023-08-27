"use client";
import { useState } from "react";
import { useSession  } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";



const createPost = () => {
    const router = useRouter();
    const {data:session} = useSession();
    const [submitting , setSubmitting ] = useState(false);

    const [post, setPost] = useState({prompt:'',tag:''});

    const createPost = async(e)=>{
        e.preventDefault()
        setSubmitting(true);
        
        try {
            
           
            
            const response = await fetch('/api/post/new' ,  
            {
                
                method: 'POST',
                body: JSON.stringify({
                    userId:session?.user.id,
                    prompt:post.prompt,
                    tag:post.tag
                })
                
            })
       console.log(response)
            
            if(response.ok){
             router.push("/");
            }
        }catch(error){
           
            console.log(error);

        }finally{
            setSubmitting(false);
        }
    }

    return (
        <Form
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPost}
        />

    )
}

export default createPost