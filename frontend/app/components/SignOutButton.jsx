

import { signOutAction } from "../lib/action";


function SignOutButton() {


  return (
    <form action={signOutAction}>
      <button
        
        className="btn text-xs sm:text-lg w-full tracking-widest bg-red-500 text-white border-none font-normal sm:font-semibold btn-xs sm:btn-sm "
      >
        
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
