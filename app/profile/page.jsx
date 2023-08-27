"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile";


const MyProfile = () => {
  const router = useRouter();
  const {data:session} = useSession();
  const [posts , setposts] = useState([])

  useEffect(() => {
    const fetchPost = async()=>{

      
      const response = await fetch(`/api/users/${session?.user.id}/postsUser`);
      const data = await response.json();
      
      setposts(data)
 

    }
    if(session?.user.id){fetchPost();}
  }, [])


  const handleEdit = (post)=>{
    router.push(`/update-post?id=${post._id}`)
  }
  

  const handleDelete = async (post)=>{

      const hasConfirmed = confirm('Are you sure you want to delete this post');
      if(hasConfirmed){
        try {
            await fetch(`/api/post/${post._id.toString()}`,
            {
              method: 'DELETE',
            });

            const filteredPost = posts.filter((p)=> 
              p._id !== post._id);

              setposts(filteredPost);

        } catch (error) {
          console.log(error);
        }
      }
  }

  return (
    <Profile
       name='My'
       desc='Welcome to your profile page'
       data={posts}
       handleEdit={handleEdit}
       handleDelete={handleDelete}
       
    />
  )
}

export default MyProfile