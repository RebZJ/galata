import "./globals.css";

// import { Web3Modal } from "../context/Web3Modal";
import { Web3Modal } from "../context/Web3Modal"
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Galata",
  description: "Verifiable transaction manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="retro">
      <body >
        <Web3Modal>
          <Navbar></Navbar>
          {children}
        </Web3Modal>
      </body>
    </html>
  );
}