import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Course from "@/components/Course"
import About from "@/components/About"
import Contact from "@/components/Contact"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <Hero/>
      <Course/>
      <About/>
      <Contact/>
      <Footer/>
    </div>
  )
}
