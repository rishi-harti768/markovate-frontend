import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import GeneralLayout from "@/components/generalLayout/GeneralLayout";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Markovate",
  description: "Markovate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <GeneralLayout>{children}</GeneralLayout>
        </body>
      </html>
    </>
  );
}
