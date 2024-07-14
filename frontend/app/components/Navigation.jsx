
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/main-logo.svg'
import { auth } from '../lib/auth'
import SignOutButton from './SignOutButton'
import ThemeChanger from './ThemeChanger'
import { MdOutlineRestaurantMenu,MdOutlineFastfood,MdOutlinePermDeviceInformation } from "react-icons/md"




const Navigation = async() => {
    const session = await auth()
   
    
    
   
    
  return (
    <div className='navbar max-w-8xl flex bg-transparent z-10 mx-auto mt-8 '>
        <Link href='/' className="flex-1 z-20 ">
            <Image src={Logo} width={64} height={64} alt="Recipe-store" className='rounded-full mx-2 shadow-xl '/>
            <p className='hidden duration-200 sm:inline text-4xl mx-4  font-semibold  tracking-wider text-secondary'>Recipe-Store</p>
        </Link>
        <div className="flex-0">
            <ul className='menu join menu-sm sm:menu-lg menu-horizontal px-1 text-secondary  '>
            <li  className='btn text-sm sm:text-2xl flex items-center'>
                    <Link href='/home'><span className='text-xl font-bold text-accent'><MdOutlineRestaurantMenu /></span>Explore</Link>
                </li>
                
                <li  className='text-sm btn sm:text-2xl flex items-center mx-auto'>
                    <Link href='/create'><span className='text-xl font-bold text-accent'><MdOutlineFastfood /></span>Create-Recipe</Link>
                </li>
                <li  className='text-sm btn sm:text-2xl flex items-center mx-auto'>
                    <Link href='/about'><span className='text-xl font-bold text-accent'><MdOutlinePermDeviceInformation /></span>About</Link>
                </li>
                <li  className=' btn text-sm sm:text-lg text-accent flex items-center'>
                    {session?.user?.image ? (<Link href="/account" className='hover:text-accent transition-colors'><img className='rounded-full w-8' src={session.user.image} alt={session.user.name}  referrerPolicy='no-referrer'/>{session.user.name}</Link>): <Link href='/account'>Account</Link>}
                   
                </li> 
                <li  className=''>
                    {session?.user ? <SignOutButton/>: ""}
                   
                </li>
                <li>{<ThemeChanger/>}</li> 
            </ul>
        </div>
      
    </div>
  )
}

export default Navigation
