import React from 'react'

const Icons = ({ typeObject, types, className }) => {
  return (
    <ul
      className={`${className} w-full flex justify-start items-center space-x-2`}
    >
      {types?.map((type, i) => (
        <li className="md:w-20 w-16" key={i}>
          <img src={typeObject ? typeObject[type.name].icon : ''} alt="" />
        </li>
      ))}
    </ul>
  )
}

export default Icons
