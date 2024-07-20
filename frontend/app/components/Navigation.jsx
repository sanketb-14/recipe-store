import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/main-logo.svg";
import { auth } from "../lib/auth";
import SignOutButton from "./SignOutButton";
import ThemeChanger from "./ThemeChanger";
import {
  MdOutlineRestaurantMenu,
  MdOutlinePermDeviceInformation,
} from "react-icons/md";

const Navigation = async () => {
  const session = await auth();

  return (
    <div className="navbar p-1 max-w-8xl w-full flex bg-transparent z-10 mx-0 sm:max-auto mt-4 sm:mt-8 flex-row items-center ">
      <Link href="/" className="flex-1 z-20 ">
        <Image
          src={Logo}
          width={64}
          height={64}
          alt="Recipe-store"
          className="rounded-full w-12 sm:w-24 mx-0 sm:mx-2 shadow-xl "
        />
         <p className="hidden sm:inline text-3xl font-bold text-primary">
          Recipe-Store
        </p>
      </Link>
    
       
      
      <div className="flex-0">
        <ul className="sm:menu p-0 join  flex flex-row justify-start  items-center w-full sm:menu-lg sm:menu-horizontal px-0 sm:px-2 text-secondary  ">
          <li className="sm:btn p-1  sm:btn-sm text-xs  sm:text-xl flex items-center pointer">
            <Link href="/home" className="flex items-center text-xs sm:text-lg px-1">
              <span className="text-md sm:text-xl font-semibold sm:font-bold text-accent">
                <MdOutlineRestaurantMenu />
              </span>
              Explore
            </Link>
          </li>

          <li className="sm:btn p-1  sm:btn-sm text-xs  sm:text-xl flex items-center pointer">
            <Link href="/about" className="flex items-center text-xs sm:text-lg px-1 ">
              <span className="text-md sm:text-xl font-semibold sm:font-bold text-accent">
                <MdOutlinePermDeviceInformation />
              </span>
              About
            </Link>
          </li>
          <li className=" sm:btn  sm:btn-sm text-xs  sm:text-xl flex items-center">
            {session?.user?.image ? (
              <Link
                href="/account"
                className="hover:text-accent transition-colors"
              >
                <img
                  className="rounded-full w-6 sm:w-8"
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
               <p className="hidden sm:inline">  {session.user.name}</p>
              </Link>
            ) : (
              <Link href="/account">Account</Link>
            )}
          </li>
          <li className="mx-1 sm:mx-2">{session?.user ? <SignOutButton /> : ""}</li>
          <li>{<ThemeChanger />}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
