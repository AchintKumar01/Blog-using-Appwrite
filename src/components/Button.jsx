import React from 'react'
// we are creating a common button to use at different places
function Button({
    children, // button text
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props // if user want to add any other className
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${type} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button
