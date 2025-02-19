import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wider">
          MERHABA, BEN [ADINIZ]
        </h1>
        <p className="text-xl md:text-2xl mb-12 tracking-wide">
          Full Stack Geliştirici & UI/UX Tasarımcı
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a
            href="#projects"
            className="border border-white/30 px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
          >
            Projelerimi İncele
          </a>
          <a
            href="#contact"
            className="bg-white text-black px-8 py-3 hover:bg-gray-200 transition-all duration-300"
          >
            İletişime Geç
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
