import { motion } from "framer-motion";

const AboutUsPage = () => {
  // Animasi untuk fade-in dan gerakan pada elemen
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-700 text-white py-20">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Tentang Kami
          </motion.h1>

          {/* Logo Aplikasi */}
          <motion.img
            src="/src/assets/logo-full.png" // Ganti dengan logo aplikasi Anda
            alt="Logo Aplikasi"
            className="mb-6 w-64 h-64 rounded-4xl object-contain"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          />

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-8"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Kami adalah tim yang berdedikasi untuk memberikan solusi terbaik bagi pengalaman berbelanja Anda.
          </motion.p>
        </div>
      </section>

      {/* Informasi Tambahan */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl font-semibold text-gray-900 mb-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Mengapa Memilih Kami?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Kami tidak hanya menjual produk, kami memberikan pengalaman belanja terbaik untuk Anda. Kami mengutamakan kualitas, kecepatan, dan layanan pelanggan yang luar biasa.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {/* Fitur 1 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-truck"></i> {/* Ikon Pengiriman */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pengiriman Cepat</h3>
              <p className="text-gray-600">Produk sampai tepat waktu dan dengan aman. Kami selalu berusaha memberikan pengiriman terbaik untuk Anda.</p>
            </motion.div>

            {/* Fitur 2 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-check-circle"></i> {/* Ikon Kualitas */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kualitas Terjamin</h3>
              <p className="text-gray-600">Kami hanya menjual produk yang sudah teruji kualitasnya dan berasal dari merek terpercaya.</p>
            </motion.div>

            {/* Fitur 3 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-headset"></i> {/* Ikon Support */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Layanan Pelanggan 24/7</h3>
              <p className="text-gray-600">Kami selalu siap membantu Anda kapan saja dengan dukungan pelanggan yang ramah dan cepat.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teknologi Stack */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl font-semibold text-gray-900 mb-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Teknologi yang Kami Gunakan
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Kami menggunakan teknologi terbaru untuk memberikan pengalaman terbaik bagi pengguna kami. Beberapa teknologi utama yang kami gunakan dalam pengembangan aplikasi ini antara lain:
          </motion.p>

          <div className="flex justify-center gap-10">
            <motion.div
              className="text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React"
                className="w-16 h-16 mb-4"
              />
              <p className="text-gray-700 font-semibold">React</p>
            </motion.div>
            <motion.div
              className="text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Node.js_logo.svg"
                alt="Node.js"
                className="w-16 h-16 mb-4"
              />
              <p className="text-gray-700 font-semibold">Node.js</p>
            </motion.div>
            <motion.div
              className="text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/MongoDB-Logo.svg"
                alt="MongoDB"
                className="w-16 h-16 mb-4"
              />
              <p className="text-gray-700 font-semibold">MongoDB</p>
            </motion.div>
            <motion.div
              className="text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/60/Expressjs.png"
                alt="Express.js"
                className="w-16 h-16 mb-4"
              />
              <p className="text-gray-700 font-semibold">Express.js</p>
            </motion.div>
            <motion.div
              className="text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/49/Tailwindcss_logo.svg"
                alt="TailwindCSS"
                className="w-16 h-16 mb-4"
              />
              <p className="text-gray-700 font-semibold">TailwindCSS</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
