import React from 'react'

const CustomInput  = ({
    label,
    type,
    name,
    className, 
    register  = () => {},
    error
}) => {
  return (
    <div className='space-y-4'>
       {label && <label htmlFor={name}>{label}</label>}
       <div>
       <input
        type={type}
        name={name}
        className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...register(name)}
      />
       </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}

    </div>
  )
}

export default CustomInput