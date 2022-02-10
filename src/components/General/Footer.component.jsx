import React from 'react'
import styles from './styles/Footer.module.css'

const Footer = () => {
  const footerStyles = 'flex flex-col justify-start items-center'

  return (
    <footer className={`${styles.footer} ${footerStyles}`}>
      <div>&copy; 2021 My Website</div>
      FOOTER
      <div className="flex flex-col justify-start items-center">
        <p className="mb-1">
          Website made by{' '}
          <a
            className="underline text-blue-600 hover:text-blue-400"
            href="http://www.johnpittenger.com/"
            title="Vectors Market"
          >
            John Pittenger
          </a>
        </p>
        <p>Website design: © John Pittenger</p>
      </div>
    </footer>
  )
}

export default Footer
