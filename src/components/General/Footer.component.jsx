import React from 'react'
import images from '../../assets/img/img-index'
import styles from './styles/Footer.module.css'

const {
  icons: { EmailImg, FacebookImg, InstagramImg },
} = images

const Footer = () => {
  const footerStyles = 'flex flex-col justify-start items-center'

  return (
    <footer className={`${styles.footer} ${footerStyles}`}>
      <div>&copy; 2021 My Website</div>
      <ul className="flex justify-center items-center space-x-4 mt-5 mb-6">
        <li>
          <a href={`mailto:${process.env.EMAIL}`}>
            <EmailImg />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com"
          >
            <FacebookImg />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/"
          >
            <InstagramImg />
          </a>
        </li>
      </ul>
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
