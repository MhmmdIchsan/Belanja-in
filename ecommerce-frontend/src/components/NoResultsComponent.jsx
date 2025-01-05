import React from 'react'

const NoResultsComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <img
        src="src/assets/undraw_empty-cart_574u.svg"
        alt="Tidak ditemukan"
        className="w-52 h-52 mb-6 opacity-80"
      />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Oops! Tidak ada hasil</h2>
      <p className="text-gray-500 max-w-md">
        Maaf, kami tidak menemukan produk yang cocok dengan pencarianmu. Coba gunakan kata kunci lain atau jelajahi kategori yang tersedia.
      </p>
    </div>
  )
}

export default NoResultsComponent
