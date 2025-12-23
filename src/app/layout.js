import "bootstrap/dist/css/bootstrap.min.css"; 
import "./globals.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer";
import BootstrapClient from "../components/BootstrapClient";
// 👇 BU SATIR EKLİ Mİ?
import { LanguageProvider } from "../context/LanguageContext"; 

export const metadata = {
  title: "Bitki Rehberi",
  description: "Bitkiler hakkında her şey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
        {/* 👇 BU SARMALAMA YAPILDI MI? */}
        <LanguageProvider> 
            <body className="d-flex flex-column min-vh-100 bg-light">
              
                <Header />

                <main className="flex-grow-1 d-flex flex-column">
                    {children}
                </main>

                <Footer />
                
                <BootstrapClient />
            </body>
        </LanguageProvider>
    </html>
  );
}