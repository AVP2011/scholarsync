import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ScholarSync",
  description: "Trust-aware opportunity discovery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white text-gray-900">
        {/* Navbar always first */}
        <Navbar />
        <main className="min-h-screen">{children}</main>
        {/* Footer always last */}
        <Footer />
      </body>
    </html>
  );
}
