

import { signOutAction } from "../lib/action";


function SignOutButton() {


  return (
    <form action={signOutAction}>
      <button
        
        className="btn  w-full tracking-widest bg-red-500 text-white border-none font-bold btn-xs sm:btn-sm "
      >
        
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
