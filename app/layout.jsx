import { Inter, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Medify - AI Medical Voice Agents",
  description: "Voice consultations with AI doctor agents.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={inter.variable}
      data-theme="cupcake"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <ClerkProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{ className: "!bg-base-300 !text-base-content" }}
          />
          {children}

        </ClerkProvider>

      </body>
    </html>
  );
}
