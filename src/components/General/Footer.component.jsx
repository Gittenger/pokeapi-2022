import React from 'react'
import { Link } from 'react-router-dom'
import images from '../../assets/img/img-index'
import styles from './styles/Footer.module.css'

const Footer = () => {
  const {
    icons: { GithubIcon, WebIcon },
  } = images

  return (
    <footer className="bg-zinc-1000 text-[dodgerblue] py-8 flex justify-between items-center">
      <Link
        className="ml-auto mr-10 underline hover:text-[midnightblue]"
        to="/about"
      >
        About
      </Link>
      <ul
        className={`${styles.iconsList} mr-auto flex justify-center items-center space-x-4`}
      >
        <li>
          <a
            href="https://github.com/Gittenger/pokeapi-2022"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
        </li>
        <li>
          <a
            href="https://johnpittenger.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WebIcon />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
