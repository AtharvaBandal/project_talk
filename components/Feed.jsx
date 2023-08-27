'use client';
import { useState,useEffect } from "react";

import PostCard from './PostCard'



const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>

      {data.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};




const Feed = () => {
  const [searchText, setsearchText] = useState('');
  const [searchTimeout, setsearchTimeout] = useState(null);
  const [searchedResult, setsearchedResult] = useState([]);

  const [posts, setposts] = useState([]);

  const fetchPost = async()=>{
    const response = await fetch('/api/post');
    const data = await response.json();
    setposts(data)
  }

  useEffect(() => {
    fetchPost();
  }, [])
  
  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); 
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);

    
    setsearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setsearchedResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setsearchText(tagName);

    const searchResult = filterPosts(tagName);
    setsearchedResult(searchResult);
  };
 

  


  return (
    <section className="feed">
      <form className=" relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      
      </form>

      {searchText ? (
        <PostCardList
          data={searchedResult}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PostCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

   

export default Feed
