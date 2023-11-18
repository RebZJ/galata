import "./globals.css";

// import { Web3Modal } from "../context/Web3Modal";
import { Web3Modal } from "../context/Web3Modal"
import Navbar from "@/components/Navbar";


export const metadata = {
  title: "Web3Modal",
  description: "Web3Modal Example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-theme="light">
        <Web3Modal>
          <Navbar></Navbar>
          {children}
        </Web3Modal>
      </body>
    </html>
  );
}