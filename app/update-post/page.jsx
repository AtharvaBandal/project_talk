"use client";
import { useState,useEffect } from "react";
import { useRouter,useSearchParams } from "next/navigation";

import Form from "@components/Form";




const EditPost = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get('id')

    const [submitting , setSubmitting ] = useState(false);
    const [post, setPost] = useState({prompt:'',tag:''});
   
    useEffect(() => {
        const getPostDetails = async()=>{
            const response = await fetch(`/api/post/${postId} `);
            const data = await response.json();
        
        
            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }
        if(postId) {
            getPostDetails(); 
        }

    },[postId]);
    

    const updatePost = async(e)=>{
        e.preventDefault()
        setSubmitting(true);
        if(!postId) {
            return alert('Post Id not found')
        }
        
        try {
            
            const response = await fetch(`/api/post/${postId}` ,  
            {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
                
            })
            
            
             router.push("/");
          
        }catch(error){
           
            console.log(error);

        }finally{
            setSubmitting(false);
        }
    }

    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePost}
        />

    )
}

export default EditPost;