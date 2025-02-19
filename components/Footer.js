import SocialIcon from "./SocialIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/denizscodes", icon: "github" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/deniz-karaca0/",
      icon: "linkedin",
    },
  ];

  return (
    <footer className="bg-black text-white/50 border-t border-white/10 p-3">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              style={{ width: "80%" }}
              className="rounded "
              src="/jpnsea.jpg"
            ></img>
            <h3 className="text-white text-lg mb-4">Hakkımda</h3>
            <p className="text-gray-400">
              Modern web teknolojileri ile yaratıcı çözümler üreten bir Full
              Stack Geliştirici.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a
                  href="/#projeler"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Projeler
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  İletişim
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg mb-4">Sosyal Medya</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{link.name}</span>
                  <SocialIcon name={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-white/10 text-center">
          <p>&copy; {currentYear} Deniz Karaca. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
