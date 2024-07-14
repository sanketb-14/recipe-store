import bg_img from "@/public/bg_img.jpeg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (


    <main className=" h-screen  ">
       <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-br from-purple-200 to-blue-500  transform -skew-y-6">
       <Image
      src={bg_img}
      fill
      className="object-cover object-top   rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0  transition duration-400"
      alt="the-orchid hotel image"
      placeholder="blur"
    />
      
      </div>
  
      <div className="relative z-10 flex  w-full mt-20 justify-center h-full">
       
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row md:flex-row items-center">
            <div className="md:w-1/2 text-white space-y-6">
              <h1 className="text-4xl  md:text-6xl  font-bold leading-tight">
                Welcome to the <br/>  <span className="text-nowrap text-7xl tracking-wider t ">Recipe-Store</span>
              </h1>
              <p className="text-xl md:text-2xl">
                Unleash your creativity and Explore different World Food..
              </p>
             <Link href='/home'>
             
             <button className="min-w-80 text-2xl tracking-wider mt-20  border-none  bg-gradient-to-br from-purple-600 to-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-100 transition  transform hover:translate-y-4   duration-500">
                Explore
              </button></Link>
            </div>
          

            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-pink-500 transform rotate-6 rounded-3xl"></div>

                
              </div>
              
            </div>
          </div>
        </div>
      </div>
  </main>


    // <div className=" relative h-screen bg-gradient-to-br from-purple-600 to-blue-500 overflow-hidden">
    //   <Image
    //       src={bg_img}
    //       fill
    //       className="object-cover  z-10 rounded-3xl shadow-2xl transform -rotate-6 hover:rotate-2 transition duration-400"
    //       alt="STORE_LOGO"
    //       placeholder="blur"
    //     />
       
    //   <div className="absolute top-0 left-0 w-full h-full bg-white opacity-90 transform -skew-y-6">
      
    //   </div>

    
     
    // </div>
  );
}
