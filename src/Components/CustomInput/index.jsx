import React, { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

const CustomInput  = ({
    label,
    type,
    name,
    className, 
    register  = () => {},
    error
}) => {
    const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className=''>
       {label && <label htmlFor={name}>{label}</label>}
       <div className='relative'>
       <input
        type={showPassword && type === "password" ? "text" : type}
        name={name}
        className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...register(name)}
      />
      {
        type === "password" && (
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={togglePassword}>
                {showPassword ? (
                    <IoEyeSharp />
                ) : (
                    <FaEyeSlash />
                )}
            </div>
        )
      }
       </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}

    </div>
  )
}

export default CustomInput