"use client"
import {useFormStatus} from 'react-dom'

const SubmitButton = ({children,pendingLabel}) => {
  const {pending } = useFormStatus()
 
  return (
    <div className="flex  items-center gap-6 w-full ">
    <button className="btn min-w-80 btn-accent text-lg  font-semibold hover:bg-accent-focus transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300" >
      {pending ? pendingLabel : children}
    </button>
  </div>
  )
}

export default SubmitButton