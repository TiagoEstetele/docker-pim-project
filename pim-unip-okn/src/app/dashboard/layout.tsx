import { inter } from "@/assets/fonts";
import "@/assets/sass/utilities/wordpressCompatibility.scss";
import "@/assets/sass/main.scss";
import { Header } from "@/componentes/general";

// Crie seu favicon aqui: https://realfavicongenerator.net/
// Depois cole os arquivos baixados dentro da pasta /public

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
