"use client";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast"; // Pastikan untuk mengimpor toast dengan benar
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    toast.success("Selamat datang di Portal Next.js!"); // Menggunakan toast.success
  }, []);

  const showPortalNotification = () => {
    toast("Ini adalah notifikasi untuk portal!"); // Pastikan ini sesuai
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <Toaster /> {/* Menambahkan Toaster di sini untuk menampilkan notifikasi */}
      <h1 className="text-3xl font-bold text-blue-600">Portal Next.js</h1>
      <p className="mt-4 text-gray-700">Klik tombol di bawah untuk masuk ke dashboard.</p>
      
      <Link href="/home">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700" onClick={showPortalNotification}>
          Pergi ke Home
        </button>
      </Link>
    </main>
  );
}