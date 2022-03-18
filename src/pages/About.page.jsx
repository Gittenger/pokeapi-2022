import React, { useEffect } from 'react'
import images from '../assets/img/img-index'

const About = () => {
  const {
    img: { ApiLogo },
  } = images

  return (
    <main className="flex flex-col justify-start items-center min-h-[485px] text-white pt-20">
      <h1 className="text-3xl mb-14">About this page...</h1>
      <div className="flex justify-center items-center">
        <img className="w-28 mb-3" src={ApiLogo} alt="" />
      </div>
      <p className="text-xl mb-1.5">
        This page was created using the{' '}
        <a
          className="text-[dodgerblue] underline hover:text-[midnightblue] duration-300"
          href="https://pokeapi.co/"
        >
          PokéAPI
        </a>{' '}
        version two.
      </p>
      <p className="text-lg mb-5">
        The custom game version logos are from user{' '}
        <a
          className="text-[dodgerblue] underline hover:text-[midnightblue] duration-300"
          href="https://www.deviantart.com/brfa98"
        >
          brfa98
        </a>{' '}
        on DeviantArt.
      </p>
      <p className="text-sm text-center lg:max-w-[600px] leading-relaxed">
        All brand names and logos are the property of their legal owners and are
        used here for identification only. The use of such names and logos does
        not imply endorsement. This project was made by{' '}
        <a
          className="text-[dodgerblue] underline hover:text-[midnightblue] duration-300"
          href="https:www.github.com/Gittenger"
        >
          John Pittenger
        </a>{' '}
        for education and learning purposes only, and is not endorsed by any of
        the items, brands, or tools used in its creation.
      </p>
    </main>
  )
}

export default About
