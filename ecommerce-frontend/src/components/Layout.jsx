import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  )
}

export default Layout
