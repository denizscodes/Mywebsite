"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NewsletterPopup from "@/components/Popup";
import { AnimatedCircles } from "@/components/Circle";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState("");

  const categories = [
    "Tümü",
    "Teknoloji",
    "Tasarım",
    "Geliştirme",
    "Düşünceler",
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Blogs"));
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogPosts(blogs);
      } catch (err) {
        console.error(err);
        setError("Veriler alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts =
    selectedCategory === "Tümü"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    setSubscriptionError("");
    try {
      // Validate email (basic check)
      if (!email || !email.includes("@")) {
        setSubscriptionError("Lütfen geçerli bir e-posta adresi girin.");
        return;
      }

      // Add the email to the "Users" collection in Firestore
      await addDoc(collection(db, "Users"), {
        email: email,
        subscribedAt: new Date(),
      });

      setEmail(""); // Clear the input field
      setSubscriptionSuccess(true);
      // Optionally, you can set a timeout to clear the success message
      setTimeout(() => {
        setSubscriptionSuccess(false);
      }, 3000); // Display for 3 seconds
    } catch (err) {
      console.error("Subscription error:", err);
      setSubscriptionError(
        "Bültene abone olurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 ">
      <NewsletterPopup />
      {/* Header */}
      <header className="py-16 text-black bg-cover bg-center bg-white p-6 ">
        <div className="container max-w-sm mx-auto px-4 bg-white  p-3 rounded">
          <div style={{ paddingLeft: "45%", marginBottom: "-50px" }}>
            {" "}
            <AnimatedCircles />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extralight text-center tracking-wider mb-6"
          >
            BLOG
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-black text-center tracking-wide"
          >
            Düşünceler, Deneyimler ve Paylaşımlar
          </motion.p>
        </div>
      </header>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 border ${
                selectedCategory === category
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "bg-white text-gray-400"
              } transition-all duration-300`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Loading / Hata Mesajı */}
        {loading && (
          <div className="text-center text-stone-600">Yükleniyor...</div>
        )}
        {error && <div className="text-center text-red-600">{error}</div>}

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="absolute top-0 left-0 bg-blue-100 text-blue-700 px-3 p-1 m-3 rounded-full">
                    Seslendirme Mevcut
                  </span>
                  <img
                    src={post.imgUrl || "/api/placeholder/800/400"}
                    alt="image"
                    width={800}
                    height={400}
                  />
                </motion.div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-stone-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime || "5 dk"}</span>
                  <span>•</span>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      post.category === "Teknoloji"
                        ? "bg-blue-100 text-blue-700"
                        : post.category === "Tasarım"
                        ? "bg-green-100 text-green-700"
                        : post.category === "Geliştirme"
                        ? "bg-purple-100 text-purple-700"
                        : post.category === "Düşünceler"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {post.category}
                  </span>
                </div>

                <h2 className="text-2xl font-light group-hover:text-stone-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-stone-600">{post.excerpt}</p>

                <div className="pt-4">
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-stone-900 hover:text-stone-600 transition-colors"
                  >
                    Devamını Oku
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6">Bültene Abone Olun</h2>
            <p className="text-stone-600 mb-8">
              Yeni yazılardan ve güncellemelerden haberdar olmak için bültene
              abone olun.
            </p>
            {subscriptionSuccess && (
              <p className="text-green-600 mb-4">Başarıyla abone oldunuz!</p>
            )}
            {subscriptionError && (
              <p className="text-red-600 mb-4">{subscriptionError}</p>
            )}
            <form
              onSubmit={handleSubscription}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="px-6 py-3 bg-white border border-stone-200 focus:outline-none focus:border-stone-900 flex-1 max-w-md"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
