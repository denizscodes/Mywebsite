import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "Deniz Karaca| Creative Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSansJP.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
