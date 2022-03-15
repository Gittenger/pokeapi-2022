import React from 'react'
import styles from './styles/Button.module.css'
import useRipple from 'use-ripple-hook'

const Button = ({ children, ...props }) => {
  const [ripple, rippleEvent] = useRipple()

  return (
    <button
      ref={ripple}
      onMouseDown={rippleEvent}
      className={`${styles.button} text-black text-lg px-3 py-2.5 md:text-xl md:px-4 md:py-3.5 rounded-lg flex justify-center items-center`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
