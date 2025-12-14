import "bootstrap/dist/css/bootstrap.min.css"; 
import "./globals.css";
import Header from "../components/Header"; // Yeni Header bileşeni
import Footer from "../components/Footer";
import BootstrapClient from "../components/BootstrapClient";

export const metadata = {
  title: "Bitki Rehberi",
  description: "Bitkiler hakkında her şey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="d-flex flex-column min-vh-100 bg-light">
        
        {/* NAVBAR (Artık ayrı bir Client Component) */}
        <Header />

        {/* İÇERİK ALANI */}
        <main className="flex-grow-1 d-flex flex-column">
             {children}
        </main>

        {/* FOOTER */}
        <Footer />
        
        {/* Bootstrap JS Tetikleyicisi */}
        <BootstrapClient />
      </body>
    </html>
  );
}