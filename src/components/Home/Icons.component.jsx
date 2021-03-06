import React from 'react'

const Icons = ({ typeObject, types, className }) => {
  return (
    <ul
      className={`${className} w-full flex justify-start items-center space-x-2`}
    >
      {types?.map((type, i) => (
        <li className="lg:w-20 md:w-16 w-14" key={i}>
          <img src={typeObject ? typeObject[type.name].icon : ''} alt="" />
        </li>
      ))}
    </ul>
  )
}

export default Icons
