import React from 'react';
import {FaSpinner} from "react-icons/fa";

export default function Loading() {
  return (
    <div className='w-full flex items-center justify-center py-2'>
      <FaSpinner className ='animate-spin text-violet-600' size={28}/>
    </div>
  )
}
