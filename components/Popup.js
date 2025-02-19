import { db } from "@/app/firebase";
import { Typography, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(""); // Email durumu
  const [isSubmitting, setIsSubmitting] = useState(false); // Formu gönderirken durum

  useEffect(() => {
    // 3 saniye sonra pop-up'ı göster
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const scrollToNewsletter = () => {
    const newsletterSection = document.querySelector("#newsletter-section");
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: "smooth" });
      handleClose();
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email) {
      setIsSubmitting(true);
      try {
        // Firebase'e email adresini ekleyin
        await addDoc(collection(db, "Users"), {
          email: email,
        });
        alert("Abonelik başarılı!");
        setEmail(""); // Formu temizle
        handleClose(); // Pop-up'ı kapat
      } catch (error) {
        alert("Bir hata oluştu: " + error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Lütfen geçerli bir email adresi girin.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="bg-white p-8 max-w-md w-full relative rounded-lg shadow-xl animate-fade-in">
        <img style={{ padding: "15px" }} src="/pattern2.png" alt="Pattern" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-transparent text-gray-500 hover:text-gray-700"
        >
          <Typography>X</Typography>
        </button>

        <div className="text-center">
          <h3 className="text-2xl font-light mb-4">Yenilikleri Kaçırmayın!</h3>
          <p className="text-stone-600 mb-6">
            En son blog yazılarımızdan haberdar olmak için bültenimize abone
            olun.
          </p>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Adresi"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              className="mb-4"
              required
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-stone-900 text-white hover:bg-stone-800 transition-colors rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Gönderiliyor..." : "Hemen Abone Ol"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
