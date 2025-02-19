"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Mesajınız gönderiliyor..." });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus({
        type: "success",
        message: "Mesajınız başarıyla gönderildi!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    }
  };

  return (
    <section id="contact" className="py-32 bg-stone-50 text-stone-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl mb-16  tracking-[0.3em] text-center border-b border-stone-200 pb-4">
            İLETİŞİM
          </h2>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-stone-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg mb-2 font-light tracking-wider">
                E-posta
              </h3>
              <a
                href="mailto:devdenizkaraca@gmail.com"
                className="text-stone-600"
              >
                devdenizkaraca@gmail.com
              </a>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-stone-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg mb-2 font-light tracking-wider">Konum</h3>
              <p className="text-stone-600">Ankara, Türkiye</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-stone-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg mb-2 font-light tracking-wider">
                Çalışma Saatleri
              </h3>
              <p className="text-stone-600">Pzt - Cuma: 09:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
