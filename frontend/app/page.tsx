import Table from "./table";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../styles/globals.css'
import Skills from "../components/skills";
import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default async function HomePage() {
  return (
    <div className={`${inter.variable} font-sans`}>
      <Navbar/>
      {/* The line below is a temp fix for some TS issue */}
      {/* @ts-expect-error Server Component  */}
      <Table/>
      <Skills/>
      <Footer/>
      <h1 className="text-3xl underline">Hello world!</h1>
    </div>
  );
}
