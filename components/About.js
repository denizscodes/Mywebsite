export default function About() {
  const philosophies = [
    {
      kanji: "匠",
      title: "USTALIK",
      description: "Her projeye bir zanaatkar titizliğiyle yaklaşıyorum.",
    },
    {
      kanji: "簡",
      title: "YALINKLIK",
      description: "Karmaşıklığı sadeleştirip özü ortaya çıkarıyorum.",
    },
    {
      kanji: "調",
      title: "DENGE",
      description: "Estetik ve işlevsellik arasında mükemmel uyumu arıyorum.",
    },
  ];

  return (
    <section id="about" className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-16 font-light tracking-widest">
            HAKKIMDA
          </h2>

          {/* Philosophies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {philosophies.map((item) => (
              <div key={item.title} className="space-y-4">
                <span className="text-5xl text-gray-300">{item.kanji}</span>
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-600 leading-relaxed">
              5 yıllık sektör deneyimimle modern web teknolojileri alanında
              uzmanlaşmış bir yazılım geliştiricisiyim. Her projede en güncel
              teknolojileri kullanarak, performans ve kullanıcı deneyimini ön
              planda tutuyorum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
