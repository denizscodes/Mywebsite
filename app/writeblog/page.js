"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "react-quill-new/dist/quill.snow.css";
import { useAuth } from "@/app/useAuth";
// react-quill-new'ü dinamik ıseolarak import ediyoruz (SSR sorunlarını önlemek için)
const ReactQuillNew = dynamic(() => import("react-quill-new"), { ssr: false });

export default function AdminBlog() {
  const user = useAuth();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Geliştirme");
  const [imgUrl, setImgUrl] = useState("");

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const storage = getStorage();

  // MP3 dosyasını Firebase Storage'a yükleyip, URL döndüren fonksiyon
  const handleFileUpload = (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `audio/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // İsteğe bağlı: Yükleme ilerlemesini takip edebilirsiniz
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Dosya yükleme hatası:", error);
          reject(error);
        },
        () => {
          // Yükleme tamamlandığında dosyanın URL'sini alıyoruz
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // Dosya seçildiğinde state'e atama
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddBlog = async () => {
    if (!title || !excerpt || !content) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let audioUrl = "";
      // Eğer bir dosya seçildiyse, yükleme işlemi gerçekleştiriliyor
      if (selectedFile) {
        audioUrl = await handleFileUpload(selectedFile);
      }

      await addDoc(collection(db, "Blogs"), {
        title,
        excerpt,
        category,
        imgUrl,
        content, // Zengin metin içeriği
        audioUrl, // Yüklenen ses dosyasının URL'si (varsa)
        date: new Date().toLocaleDateString(),
      });

      // Form alanlarını sıfırlama
      setImgUrl("");
      setTitle("");
      setExcerpt("");
      setContent("");
      setCategory("Geliştirme");
      setSelectedFile(null);
    } catch (err) {
      setError("Blog eklenirken hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Lütfen giriş yapın.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg my-16">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Yeni Blog Ekle</h1>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlık"
        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="Özet"
        rows="3"
        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <input
        type="text"
        value={imgUrl}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Image Url"
        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Geliştirme">Geliştirme</option>
        <option value="Tasarım">Tasarım</option>
        <option value="Teknoloji">Teknoloji</option>
      </select>

      {/* MP3 dosyası seçimi */}
      <input
        type="file"
        accept="audio/mp3"
        onChange={handleFileChange}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* react-quill-new ile metin düzenleyici */}
      <div className="mb-4">
        <ReactQuillNew
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Blog içeriğinizi buraya yazın..."
          className="h-64"
        />
      </div>

      <button
        onClick={handleAddBlog}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold p-3 mt-16 rounded-lg transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Ekleniyor..." : "Blog Ekle"}
      </button>
    </div>
  );
}
