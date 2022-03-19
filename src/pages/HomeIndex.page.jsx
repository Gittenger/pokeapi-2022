import React, { useContext, useEffect } from 'react'
import MainContext from '../contexts/MainContext'
import { Outlet, useNavigate } from 'react-router-dom'

const HomeIndex = () => {
  const { setRedirectedFromSearch, setSearchQuery, setSearchPageCount } =
    useContext(MainContext)
  const navigate = useNavigate()

  useEffect(() => {
    setRedirectedFromSearch(false)
    setSearchQuery('')
    setSearchPageCount(null)
    navigate('/1', {
      replace: true,
    })
  }, [])

  return (
    <main className="min-h-[1000px] py-8 bg-zinc-900">
      <Outlet />
    </main>
  )
}

export default HomeIndex
