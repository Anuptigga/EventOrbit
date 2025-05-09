import React from 'react'

function Button({ children, className = '', onClick, ...props }) {
  return (
    <button
      className={`flex items-center gap-2 cursor-pointer ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
