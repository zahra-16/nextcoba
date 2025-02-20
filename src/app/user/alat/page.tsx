"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Image, Spinner } from "@heroui/react";

export default function AlatList({ kategori_id }) {
  const [alat, setAlat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlat = async () => {
      if (!kategori_id) return; // Jangan fetch jika kategori belum dipilih

      setLoading(true);
      try {
        const response = await axios.get(`https://penyewaan.vercel.app/api/v1/alat?kategori_id=${kategori_id}`);
        setAlat(response.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlat();
  }, [kategori_id]); // Akan berjalan setiap kategori_id berubah

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="blue" size="lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-w-screen gap-6 pt-3 mt-6">
      {alat.map((item) => (
        <Card
          key={item.alat_id}
          className="relative w-[190px] h-[320px] rounded-3xl overflow-hidden shadow-lg flex flex-col border-2"
        >
          {/* Gambar */}
          <Image
            alt={item.alat_nama}
            className="object-cover w-full h-48"
            src={item.gambar_utama || "https://via.placeholder.com/250"}
          />

          {/* Konten */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.alat_nama}</h3>
              <p className="text-sm text-gray-600">{item.alat_deskripsi}</p>
              <p className="text-md font-medium text-blue-600 mt-1">Rp.{item.alat_hargaperhari}/hari</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
