import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Configuración de la fuente Inter de Google Fonts
const inter = Inter({ subsets: ['latin'] });

// Metadatos de la aplicación (Título y descripción para SEO)
export const metadata: Metadata = {
  title: 'Pokemon App',
  description: 'Explora el mundo Pokemon',
};

// Componente RootLayout: Estructura base compartida por todas las páginas
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Definición del idioma global del documento HTML
    <html lang="es">
      <body className={inter.className}>
        {/* Proveedor de Idioma: Permite que toda la app acceda a las traducciones */}
        <LanguageProvider>
          {/* Contenedor principal del layout */}
          <div className="layoutWrapper">
            <Header /> {/* Barra de navegación superior */}
            <main className="layoutMain">{children}</main> {/* Contenido dinámico de cada página */}
            <Footer /> {/* Pie de página */}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
