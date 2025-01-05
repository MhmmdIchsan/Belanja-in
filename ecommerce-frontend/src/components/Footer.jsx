import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiGithub } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-8 sm:space-y-0">
          {/* Logo and Info */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <img
              src="/src/assets/logo.png" // Ganti dengan path logo yang sesuai
              alt="Logo"
              className="h-12 w-12 rounded-full"
            />
            <h1 className="text-2xl font-bold">Belanja-in</h1>
            <p className="text-gray-400 text-sm">Temukan produk terbaik dengan harga terbaik di sini!</p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 sm:space-y-0 space-y-4 text-center sm:text-left">
            <div>
              <h3 className="font-semibold text-lg">Perusahaan</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-blue-400">Karir</a></li>
                <li><a href="#" className="hover:text-blue-400">Privasi</a></li>
                <li><a href="#" className="hover:text-blue-400">Syarat & Ketentuan</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Layanan</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Pengiriman</a></li>
                <li><a href="#" className="hover:text-blue-400">Bantuan</a></li>
                <li><a href="#" className="hover:text-blue-400">Pengembalian</a></li>
                <li><a href="#" className="hover:text-blue-400">Pembayaran</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Ikuti Kami</h3>
              <div className="flex space-x-4 justify-center sm:justify-start">
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <FiFacebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <FiInstagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <FiTwitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <FiGithub size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Belanja-in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
