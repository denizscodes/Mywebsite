"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import NewsletterPopup from "@/components/Popup";
import Blog from "./blog/page";

export default function Home() {
  const projects = [
    {
      title: "CitioApp",
      description:
        "Citio’nun web platformunu geliştiren ekibin bir parçası olarak, Next.js, React ve Tailwind CSS kullanarak akıcı ve duyarlı bir kullanıcı deneyimi sağladık. Node.js ve Feather.js ile ölçeklenebilir backend servisleri geliştirerek API performansını ve veritabanı sorgularını optimize ettik. Ödeme işlemleri, rezervasyon yönetimi ve gerçek zamanlı bildirimler için üçüncü taraf API’leri entegre ederek platformun işlevselliğini artırdık.",
      tags: [
        "Next.js",
        "React",
        "Node.js",
        "Feathers.js",
        "Tailwind CSS",
        "Docker",
        "MongoDB",
      ],
      image: "/citioapp.png",
    },
    {
      title: "Ne Yesek",
      description:
        "Yapay zeka destekli bir uygulama. Ne Yesek, odak noktası israfı önlemek, kullanıcının ne yiyeceğine karar vermesine yardımcı olmaktır. Yapay zeka algoritmalarıyla kişisel tercihlere, geçmiş seçimlere göre yemek önerileri sunar. Şuan yapım aşamasındadır",
      tags: [
        "Next.js",
        "React",
        "Node.js",
        "Firebase",
        "Tailwind CSS",
        "Material UI",
        "AI",
      ],
      image: "/neyesek.png",
    },
  ];

  const skills = [
    {
      ad: "Frontend Geliştirme",
      seviye: 90,
      ikon: "/ikonlar/frontend.svg",
    },
    {
      ad: "Backend Geliştirme",
      seviye: 85,
      ikon: "/ikonlar/backend.svg",
    },
    {
      ad: "UI/UX Tasarım",
      seviye: 80,
      ikon: "/ikonlar/design.svg",
    },
    {
      ad: "Mobil Geliştirme",
      seviye: 75,
      ikon: "/ikonlar/mobile.svg",
    },
  ];
  // Reusable Chip component
  function Chip({ children }) {
    return (
      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full mr-2 mb-2 hover:bg-gray-300 transition-colors duration-200">
        {children}
      </span>
    );
  }

  // Reusable ChipGroup component for grouping chips with a label
  function ChipGroup({ label, children }) {
    return (
      <div className="mb-3">
        <span className="text-gray-700 font-semibold">{label}:</span>
        <div className="mt-1"> {children} </div>
      </div>
    );
  }
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    let mouseMoved = false;

    const pointer = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };
    const params = {
      pointsNumber: 40,
      widthFactor: 0.3,
      mouseThreshold: 0.6,
      spring: 0.4,
      friction: 0.5,
    };

    const trail = new Array(params.pointsNumber);
    for (let i = 0; i < params.pointsNumber; i++) {
      trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
      };
    }

    window.addEventListener("click", (e) => {
      updateMousePosition(e.pageX, e.pageY);
    });
    window.addEventListener("mousemove", (e) => {
      mouseMoved = true;
      updateMousePosition(e.pageX, e.pageY);
    });
    window.addEventListener("touchmove", (e) => {
      mouseMoved = true;
      updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    });

    function updateMousePosition(eX, eY) {
      pointer.x = eX;
      pointer.y = eY;
    }

    setupCanvas();
    update(0);
    window.addEventListener("resize", setupCanvas);

    function update(t) {
      if (!mouseMoved) {
        pointer.x =
          (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
          window.innerWidth;
        pointer.y =
          (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
          window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
      }
      ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      ctx.stroke();

      window.requestAnimationFrame(update);
    }

    function setupCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    return () => {
      window.removeEventListener("click", updateMousePosition);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("touchmove", updateMousePosition);
      window.removeEventListener("resize", setupCanvas);
    };
  }, []);

  return (
    <main className="relative">
      <NewsletterPopup />

      {/* Background Canvas */}
      <canvas className="absolute inset-0 -z-10"></canvas>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="absolute inset-0 opacity-80"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="mb-8">
            <img
              src="/deniz.jpeg"
              alt="Shota Nishida"
              className="w-48 h-48 md:w-72 md:h-72 rounded-full mx-auto object-cover"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-extralight text-gray-500 mb-6">
            ウェブ開発者
          </h1>
          <p className="text-xl md:text-2xl text-black mb-8 font-light tracking-wider">
            CREATIVE DEVELOPER & DESIGNER
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#contact"
              className="border border-white/30 text-black px-8 py-3 rounded-none bg-white hover:bg-black hover:text-white transition-all duration-300"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-32 bg-white"
      >
        <div id="hakkımda" className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-16 font-light tracking-widest">
              HAKKIMDA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div whileHover={{ scale: 1.05 }} className="space-y-4">
                <span className="text-5xl text-gray-300">技</span>
                <h3 className="text-xl font-medium">USTALIK</h3>
                <p className="text-gray-600">
                  Dijital dünyada ustalıkla, en ince detaylara kadar özen
                  göstererek çalışıyorum.
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="space-y-4">
                <span className="text-5xl text-gray-300">簡</span>
                <h3 className="text-xl font-medium">SADELIK</h3>
                <p className="text-gray-600">
                  Gereksiz detaylardan arınmış, özünde güzelliği barındıran
                  tasarımlar.
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="space-y-4">
                <span className="text-5xl text-gray-300">和</span>
                <h3 className="text-xl font-medium">UYUM</h3>
                <p className="text-gray-600">
                  Geleneksel ve modern yaklaşımları harmanlayarak zamansız
                  eserler ortaya koyuyorum.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      <img
        alt="knds"
        width={"100%"}
        style={{ height: "100px", objectFit: "cover" }}
        src="/pattern.png"
      />
      {/* Work Section */}
      <section id="projeler" className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-16  tracking-widest text-center">
            Projeler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Blog />
      {/* Skills Section */}
      <section className="py-20 px-4 md:py-32 md:px-6 bg-white">
        <div className="w-full text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-widest text-gray-700 mb-12 md:mb-16">
            Yetenekler & Teknolojiler
          </h2>
          <div className="relative flex justify-center">
            {/* Overlay */}
            <div className=" inset-0 flex items-center justify-center bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-lg">
              <div className="w-full md:w-3/4 text-gray-800">
                {/* Yetenekler Bölümü */}

                {/* Teknolojiler Bölümü */}
                <div className="p-6 flex bg-gray-100 rounded-lg shadow">
                  <div className="space-y-6">
                    {/* Frontend Container */}
                    <div className="p-4 bg-white rounded-lg shadow">
                      <ChipGroup label="Frontend">
                        <Chip>Next.js</Chip>
                        <Chip>React</Chip>
                        <Chip>Tailwind CSS</Chip>
                        <Chip>HTML5</Chip>
                        <Chip>CSS3</Chip>
                        <Chip>JavaScript (ES6+)</Chip>
                      </ChipGroup>
                    </div>

                    {/* Backend Container */}
                    <div className="p-4 bg-white rounded-lg shadow">
                      <ChipGroup label="Backend">
                        <Chip>Node.js</Chip>
                        <Chip>Express.js</Chip>
                        <Chip>API geliştirme</Chip>
                      </ChipGroup>
                    </div>

                    {/* Veritabanları Container */}
                    <div className="p-4 bg-white rounded-lg shadow">
                      <ChipGroup label="Veritabanları">
                        <Chip>MongoDB</Chip>
                        <Chip>Firebase</Chip>
                      </ChipGroup>
                    </div>

                    {/* DevOps & Araçlar Container */}
                    <div className="p-4 bg-white rounded-lg shadow">
                      <ChipGroup label="DevOps & Araçlar">
                        <Chip>Docker</Chip>
                        <Chip>Git</Chip>
                        <Chip>CI/CD</Chip>
                        <Chip>Vercel</Chip>
                        <Chip>AWS</Chip>
                      </ChipGroup>
                    </div>

                    {/* Diğer Container */}
                    <div className="p-4 bg-white rounded-lg shadow">
                      <ChipGroup label="Diğer">
                        <Chip>
                          Kimlik Doğrulama (OAuth, JWT, Firebase Auth)
                        </Chip>
                        <Chip>Durum Yönetimi (Redux)</Chip>
                        <Chip>Web Performans Optimizasyonu</Chip>
                      </ChipGroup>
                    </div>
                    <Chip>
                      <a href="/cv.pdf"> CV'me göz at</a>
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
