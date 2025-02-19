"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import "react-quill-new/dist/quill.snow.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { db } from "@/app/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useAuth } from "@/app/useAuth";

const ReactQuillNew = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EditBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [open, setOpen] = useState(false);
  // Seçilen yeni ses dosyasını tutmak için state
  const [selectedAudioFile, setSelectedAudioFile] = useState(null);

  const storage = getStorage();
  const user = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "Blogs"));
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (err) {
        setError("Bloglar getirilirken hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Firebase Storage'a dosya yükleyip downloadURL dönen fonksiyon
  const handleFileUpload = (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `audio/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Dosya yükleme hatası:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleUpdateBlog = async (id, updatedBlog) => {
    setLoading(true);
    try {
      // Eğer yeni bir ses dosyası seçildiyse önce yükle
      if (selectedAudioFile) {
        const audioUrl = await handleFileUpload(selectedAudioFile);
        updatedBlog = { ...updatedBlog, audioUrl };
      }

      const blogRef = doc(db, "Blogs", id);
      await updateDoc(blogRef, updatedBlog);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id ? { ...blog, ...updatedBlog } : blog
        )
      );
      // Güncelleme sonrası ses dosyası seçimini sıfırla
      setSelectedAudioFile(null);
      handleCloseDialog();
    } catch (err) {
      setError("Blog güncellenirken hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "Blogs", id));
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      setOpen(false);
    } catch (err) {
      setError("Blog silinirken hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (blog) => {
    setSelectedBlog(blog);
    // Düzenleme sırasında mevcut ses dosyası URL'si korunur, yeni dosya seçimi boş olur
    setSelectedAudioFile(null);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedBlog(null);
    setOpen(false);
  };
  if (!user) return <p>Lütfen giriş yapın.</p>;

  return (
    <div className="flex-col max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Blogları Düzenle
      </h1>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {loading && <p className="text-gray-500">Yükleniyor...</p>}
      {!loading && blogs.length === 0 && <p>Henüz blog eklenmemiş.</p>}
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="mb-4 p-4 border rounded-lg shadow cursor-pointer"
          onClick={() => handleOpenDialog(blog)}
        >
          <h2 className="text-lg font-semibold">{blog.title}</h2>
          <p className="text-sm text-gray-600">{blog.excerpt}</p>
        </div>
      ))}

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Blog Düzenle</DialogTitle>
        <DialogContent>
          {selectedBlog && (
            <>
              <input
                type="text"
                value={selectedBlog.title}
                onChange={(e) =>
                  setSelectedBlog({ ...selectedBlog, title: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <textarea
                value={selectedBlog.excerpt}
                onChange={(e) =>
                  setSelectedBlog({
                    ...selectedBlog,
                    excerpt: e.target.value,
                  })
                }
                rows="2"
                className="w-full  p-2 border border-gray-300 rounded-lg mb-2"
              ></textarea>
              <input
                type="text"
                value={selectedBlog.imgUrl || ""}
                onChange={(e) =>
                  setSelectedBlog({ ...selectedBlog, imgUrl: e.target.value })
                }
                placeholder="Görsel URL"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <ReactQuillNew
                theme="snow"
                value={selectedBlog.content}
                onChange={(content) =>
                  setSelectedBlog({ ...selectedBlog, content })
                }
                className="mb-2 h-auto"
              />
              {/* Mevcut ses dosyası varsa göster */}

              {/* Yeni ses dosyası seçimi */}
              <input
                type="file"
                accept="audio/mp3"
                onChange={(e) =>
                  e.target.files[0] && setSelectedAudioFile(e.target.files[0])
                }
                className="w-full p-2 mt-12 border border-gray-300 rounded-lg mb-2"
              />
              {selectedBlog.audioUrl && (
                <div className="mb-2">
                  <p className="text-sm font-semibold">Mevcut Ses Dosyası:</p>
                  <audio controls src={selectedBlog.audioUrl}>
                    Tarayıcınız audio elementini desteklemiyor.
                  </audio>
                </div>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            İptal
          </Button>
          <Button
            onClick={() => handleUpdateBlog(selectedBlog.id, selectedBlog)}
            color="primary"
          >
            Güncelle
          </Button>
          <Button
            onClick={() => handleDeleteBlog(selectedBlog.id)}
            color="error"
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
