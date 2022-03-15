import React from 'react'
import styles from './styles/Button.module.css'

const Button = ({ children, ...props }) => (
  <button
    className={`${styles.button} text-black flex justify-center items-center`}
    {...props}
  >
    {children}
  </button>
)

export default Button
