import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priyank — Interaction & Product Designer",
  description: "It's not the view. It's how you frame it. Portfolio of Priyank, M.Des, IIT Roorkee.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
