// BlogDetail.js
"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import AudioPlayer from "@/components/Audio";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Blog verisini Firestore'dan çekme
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const docRef = doc(db, "Blogs", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setBlog(docSnap.data());
          } else {
            setBlog(null);
          }
        } catch (error) {
          console.error("Blog verisi alınırken hata oluştu:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (event) => {
    if (audioRef.current) {
      const newTime = parseFloat(event.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipTime = (seconds) => {
    if (audioRef.current) {
      let newTime = audioRef.current.currentTime + seconds;
      if (newTime < 0) newTime = 0;
      if (newTime > duration) newTime = duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Yükleniyor...</div>;
  }

  if (!blog) {
    return (
      <div className="text-center py-20 text-gray-500">Blog bulunamadı.</div>
    );
  }

  return (
    <div className="max-w-4xl w-[97%] mx-auto my-3 p-6 mt-20 bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-4xl font-semibold text-gray-900 mb-4">
        {blog.title}
      </h1>
      <p className="text-gray-600 text-lg mb-4">{blog.excerpt}</p>
      <p className="text-gray-400 text-sm mb-6">
        {blog.date} - {blog.category}
      </p>
      <div className="border-t border-gray-300 my-6"></div>
      <div
        className="prose lg:prose-xl max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
      {blog.audioUrl && (
        <div className="mb-20 absoulte fixed bottom-11  right-4">
          <AudioPlayer
            audioUrl={blog.audioUrl}
            ref={audioRef}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            onPlayPause={handlePlayPause}
            onSeek={handleSeek}
            onSkipTime={skipTime}
          />
        </div>
      )}
    </div>
  );
}
