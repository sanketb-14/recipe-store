
import { signInAction } from "@/app/lib/action"

function SignInBtn(){
    return (
       <form 
       action={signInAction} 
       className="flex justify-center bg-base-200">
         <button className=' text-lg  btn  font-medium'>
        <img
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>Continue with Google</span>
      </button>
       </form>
    )
}
export default SignInBtn