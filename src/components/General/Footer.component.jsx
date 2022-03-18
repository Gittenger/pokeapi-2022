import React from 'react'
import { Link } from 'react-router-dom'
import images from '../../assets/img/img-index'
import styles from './styles/Footer.module.css'

const Footer = () => {
  const {
    icons: { GithubIcon, WebIcon },
  } = images

  return (
    <footer className="bg-zinc-1000 flex flex-col justify-center items-center py-8">
      <div className="flex justify-between items-center text-[dodgerblue] mb-3">
        <Link
          className="ml-auto mr-10 font-card text-2xl underline hover:text-[midnightblue]"
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
      </div>
      <div className="flex justify-center items-center text-white font-sansation">
        <span className="mr-2">&copy;</span>
        Website by John Pittenger
      </div>
    </footer>
  )
}

export default Footer
