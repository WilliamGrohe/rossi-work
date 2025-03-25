import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Livraria Rossi - Trabalhe conosco",
  description: "Quer trabalhar conosco? Envie seu currículo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className} antialiased flex justify-center overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
