"use client";
import { useState } from "react";
import Image from "next/image";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Tümü" },
    { id: "web", label: "Web Geliştirme" },
    { id: "mobile", label: "Mobil" },
    { id: "design", label: "UI/UX" },
  ];

  const projects = [
    {
      id: 1,
      title: "E-Ticaret Platformu",
      description: "Modern ve kullanıcı dostu alışveriş deneyimi",
      category: "web",
      image: "/projects/ecommerce.jpg",
      technologies: ["Next.js", "Tailwind CSS", "Stripe"],
      link: "#",
    },
    // Diğer projeler...
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl mb-16 font-light tracking-widest text-center">
          PROJELERİM
        </h2>

        {/* Filters */}
        <div className="flex justify-center mb-12 gap-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden bg-white shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl mb-2 font-light">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex gap-2 justify-center flex-wrap mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm border border-white/30 px-3 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-white/30 px-6 py-2 hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Projeyi İncele
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
