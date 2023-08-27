import Feed from "@components/Feed"

const Home = () => {
  return (
   <section className="w-full flex-center flex-col" >
    <h1 className="head_text text-center">
      Discover & Share 
      <br className="max-md:hidden"/>
      <span className="text-blue-800"> Thoughts..../ </span>
    </h1>
    <p className="desc text-center">
      Here your words will get an open platform where there is no censorship. 
    </p>
    
    <Feed/>


   </section>
  )
}

export default Home