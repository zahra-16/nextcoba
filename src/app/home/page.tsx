"use client";

import { Button, Card, CardFooter, Image } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";  

interface Alat {
  alat_nama: string;
  alat_deskripsi: string;
  alat_hargaperhari: number;
  alat_stok: number;
  alat_kategori_id: number;
}

export default function HomePage() {
  const scrollRef = useRef(null);
  const [alatData, setAlatData] = useState<Alat[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setformData] = useState<Alat>({
    alat_nama: "",
    alat_deskripsi: "",
    alat_hargaperhari: 0,
    alat_stok: 0,
    alat_kategori_id: 0,
  });

  const fetchData = async () => {
    try {
      const response = await fetch("https://penyewaan.vercel.app/api/v1/alat");
      const result = await response.json();
      if (response.ok) {
        setAlatData(result.data);
      } else {
        console.error("Gagal mengambil data:", result);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const throwError = () => {
    try {
      throw new Error("This is a simulated error!");
    } catch (error) {
      console.error("Caught error:", error);
      alert("Terjadi kesalahan: " + error.message);
    }
  };

  const showPortalNotification = () => {
    toast("Hallo! ini adalah notifikasi untuk portal!");
  };

  // scroll ball
  const plants = [
    { id: 1, name: "Lampu", price: "Rp.15000", image: "lampu retro.jpeg", isNew: true },
    { id: 2, name: "Alat Tidur", price: "Rp.10000", image: "sleeping bag.jpeg", hasButton: true },
    { id: 3, name: "Alat Camping", price: "Rp.15000", image: "Hanpack.jpeg", isNew: true  },
    { id: 4, name: "Alat Memasak", price: "Rp.10000", image: "tremosmini.jpeg", isNew: false},
  ];



  return (
    <div id="section1" className="p-6 w-full flex flex-col items-center pt-25 min-h-screen my-20">
      {/* Hero Section */}
      <div className="relative w-full max-w-7xl h-[400px] flex items-center justify-center text-center text-white bg-cover bg-center rounded-xl shadow-xl overflow-hidden" style={{ backgroundImage: "url('/mountain.jpeg')" }}>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-md rounded-xl"></div>
        <div className="relative z-10 px-6 max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight drop-shadow-lg">Sewa Barang Mudah & Cepat</h1>
          <p className="text-lg mt-3 drop-shadow-md">Temukan berbagai barang untuk disewa sesuai kebutuhan Anda!</p>
          <div className="mt-6 flex justify-center space-x-4">
            <button id="portal" onClick={showPortalNotification} className="bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 transition-all">Selamat Datang</button>
            <button id="error" onClick={throwError} className="bg-red-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-700 transition-all">Throw Error</button>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="mt-16 my-20 w-full max-w-7xl">
        <h2 className="text-center text-3xl font-semibold mb-8">Choose from our <span className='text-green-700 font-semibold italic'>curated plant</span> collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {plants.map((plant) => (
            <div key={plant.id} className="relative bg-white p-5 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-xl transition transform hover:scale-105">
              {plant.isNew && (
                <span className="absolute top-2 left-2 bg-green-700 text-white text-xs px-3 py-1 rounded-full">NEW!</span>
              )}
              <img src={plant.image} alt={plant.name} className="w-full h-56 object-cover rounded-md" />
              <h3 className="mt-4 text-xl font-medium text-gray-800 text-left">{plant.name}</h3>
              <p className="text-green-700 text-lg text-left font-semibold">{plant.price}</p>
            </div>
          ))}
        </div>
      </div>


      {/* Categories Section */}
      <h1 className="font-bold text-4xl mx-15">Kategori</h1>
      <div className="flex flex-wrap gap-4 justify-center my-5">
        {["Alat Pencahayaan", "Alat memasak", "Alat Tidur", "Alat Camping"].map((category, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-white rounded-full shadow-md text-sm font-medium text-green-700 border border-green-400 transition-all"
          >
            <span className="text-xs">{category}</span>
          </div>
        ))}
      </div>

      {/* Rental Products */}
      <div className="grid grid-cols-4 gap-9 mt-6 pb-8">
        {alatData.map((item) => (
          <Card
            key={item.alat_nama}
            className="relative w-[200px] h-[320px] rounded-2xl overflow-hidden shadow-lg flex flex-col border-2"
          >
            {/* Gambar */}
            <Image
              alt={item.alat_nama}
              className="object-cover w-full h-[100%]"
              src={item.gambar_utama || "https://via.placeholder.com/250"}
            />

            {/* Konten */}
            <div id="section2" className="p-4 flex-1 flex flex-col justify-between line-clamp-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">{item.alat_nama}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.alat_deskripsi}</p>
                <p className="text-md font-medium text-blue-600 mt-1">Rp.{item.alat_hargaperhari} / hari</p>
                {/* <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 transition-all">
                  Sewa
                </button> */}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
