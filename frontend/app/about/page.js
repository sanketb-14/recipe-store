
import Image from 'next/image'
import aboutPic1 from "@/public/aboutpic1.jpg"
import aboutpic2 from "@/public/aboutpic2.jpg"
export const metadata = {
    title:"About"
}
import Link from 'next/link'
const Page = async () => {

    return (
        <div className="grid grid-cols-5 gap-x-12 gap-y-32 text-lg items-center">
        <div className="col-span-3">
          <h1 className="text-4xl mb-10 text-accent font-medium">
            Welcome to Recipe-Store
          </h1>
  
          <div className="space-y-8">
            <p>
            Welcome to Recipe Store, your ultimate destination for culinary inspiration and recipe sharing! Whether you're a seasoned chef or a kitchen novice, Recipe Store is designed to ignite your passion for cooking and help you discover new and exciting dishes
            </p>
            <p>
            At Recipe Store, our mission is to create a vibrant community where food enthusiasts can connect, share, and explore the world of gastronomy. We believe that cooking should be a joyous experience, and our platform is here to make it easier for you to find delicious recipes, share your culinary creations, and engage with like-minded food lovers.
            </p>
            <p>
            Diverse Recipes: Explore a vast collection of recipes from various cuisines, curated by our community of passionate cooks. From quick weekday dinners to elaborate gourmet meals, there's something for everyone.
            </p>
          </div>
        </div>
  
        <div className="col-span-2 relative aspect-square">
          <Image
            src={aboutPic1}
            className='object-cover'
            quality={50}
            fill
            alt="Family sitting around a fire pit in front of cabin"
          />
        </div>
  
        <div className="col-span-2 aspect-square relative">
          <Image src={aboutpic2} fill alt="Family that manages The Wild Oasis" 
          quality={50} className='object-cover' />
        </div>
  
        <div className="col-span-3">
          <h1 className="text-4xl mb-10 text-accent font-medium">
            Managed by our family since 1962
          </h1>
  
          <div className="space-y-8">
            <p>
            Founded by a team of food lovers, Recipe Store was born out of a shared passion for cooking and the desire to make it accessible to everyone. We understand that great food has the power to bring people together, and our platform is dedicated to fostering a community where everyone can share their love for cooking.
            </p>
            <p>
            Recipe Store is more than just a recipe website; it's a community of food lovers who inspire and support each other. Join us today and start your culinary adventure. Share your favorite recipes, discover new dishes, and connect with other food enthusiasts from around the world.ets tranquility, and every visit is
              like coming home.
            </p>
  
            <div>
              <Link
                href="/home"
                className="inline-block mt-4 bg-accent px-8 py-5 text-secondary-content text-lg font-semibold hover:bg-accent transition-all"
              >
                Explore 
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Page
  