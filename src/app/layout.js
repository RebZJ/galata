
"use client"
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
// import { Web3Modal } from "../context/Web3Modal";
import { Web3Modal } from "../context/Web3Modal"
import Navbar from "@/components/Navbar";



export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="retro">
      <AppProvider>
        <body >
          <Web3Modal>
            <Navbar></Navbar>
            {children}
          </Web3Modal>

        </body>
      </AppProvider>
    </html>
  );
}