"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardFooter, CardHeader, Spinner } from "@heroui/react";
import AlatList from "./alat/page";

export default function CategoryCard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://penyewaan.vercel.app/api/v1/kategori");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (kategori_id) => {
    setSelectedCategory(kategori_id);
  };

  return (
    <div id="section1" className="container mx-auto p-6 min-h-screen my-20">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Pilih Kategori Alat
      </h1>

      {/* Bagian Kategori */}
      <div id="section2" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        {loadingCategories ? (
          <div className="flex justify-center col-span-full">
            <Spinner size="lg" className="text-green-500" />
          </div>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <Card
              key={category.kategori_id}
              className="w-full max-w-[400px] bg-white shadow-lg rounded-3xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <CardHeader className="bg-[#3F4F44] text-white p-5 rounded-t-3xl text-center">
                <h2 className="text-xl font-semibold">{category.kategori_nama || "Tanpa Nama"}</h2>
              </CardHeader>
              <CardFooter className="p-4 flex justify-center">
                <button
                  id="alat"
                  onClick={() => handleCategoryClick(category.kategori_id)}
                  className="bg-[#A27B5C] text-white px-5 py-2 rounded-lg transition-all duration-300 hover:bg-[#DCD7C9] hover:shadow-lg"
                >
                  Lihat Alat
                </button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Tidak ada kategori yang tersedia.
          </p>
        )}
      </div>

      {/* Bagian Alat */}
      {selectedCategory && (
        <div className="mt-10 p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-left">
            Daftar Alat
          </h2>
          {/* Loading saat alat sedang diambil */}
          <AlatList kategori_id={selectedCategory} />
        </div>
      )}
    </div>
  );
}
