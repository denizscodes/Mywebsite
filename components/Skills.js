"use client";
import { useEffect, useRef } from "react";

export default function Skills() {
  const skillsRef = useRef(null);

  const skills = [
    {
      category: "Frontend",
      items: [
        { name: "React/Next.js", level: 90 },
        { name: "JavaScript/TypeScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "Tailwind CSS", level: 90 },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "SQL", level: 75 },
        { name: "MongoDB", level: 80 },
      ],
    },
    {
      category: "Araçlar & Diğer",
      items: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 75 },
        { name: "AWS", level: 70 },
        { name: "UI/UX Tasarım", level: 85 },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".skill-bar").forEach((bar) => {
              bar.style.width = bar.dataset.level + "%";
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-32 bg-white" ref={skillsRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl mb-16 font-light tracking-widest text-center">
          YETENEKLER
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {skills.map((category) => (
            <div key={category.category}>
              <h3 className="text-xl font-medium mb-6 text-center">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full bg-black transition-all duration-1000 ease-out"
                        style={{ width: "0%" }}
                        data-level={skill.level}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
