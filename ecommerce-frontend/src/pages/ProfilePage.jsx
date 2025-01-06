import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Asumsi kita menggunakan context untuk otentikasi
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth(); // Mengambil informasi user dari context
  const [editMode, setEditMode] = useState(false); // Untuk mengaktifkan mode edit
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profilePic: user?.profilePic || "", // Menambahkan foto profil jika ada
  });
  const navigate = useNavigate();

  // Fungsi untuk menghandle perubahan pada input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk menyimpan perubahan profil
  const handleSave = () => {
    // Lakukan validasi data sebelum update
    if (formData.name.trim() === "") {
      alert("Nama tidak boleh kosong!");
      return;
    }
    updateUser(formData); // Fungsi untuk update data user di context
    setEditMode(false); // Menonaktifkan mode edit
  };

  // Fungsi logout
  const handleLogout = () => {
    logout(); // Fungsi untuk logout user
    navigate("/login"); // Redirect ke halaman login setelah logout
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-center text-red-500">Anda harus login untuk melihat profil!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Profil Anda</h2>

      {/* Form Profile */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img
            src={formData.profilePic || "/default-profile.png"} // Gambar profil, jika kosong, gunakan gambar default
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Form Edit Profil */}
        <div>
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
              disabled={!editMode}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
              disabled={!editMode}
            />
          </div>

          {/* Button Save/Cancel */}
          <div className="flex gap-4 mt-6">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Edit Profil
              </button>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
