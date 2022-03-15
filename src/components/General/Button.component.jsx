import React from 'react'
import styles from './styles/Button.module.css'
import useRipple from 'use-ripple-hook'

const Button = ({ children, ...props }) => {
  const [ripple, rippleEvent] = useRipple()

  return (
    <button
      ref={ripple}
      onMouseDown={rippleEvent}
      className={`${styles.button} text-black text-xl px-4 py-3.5 rounded-lg flex justify-center items-center`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
