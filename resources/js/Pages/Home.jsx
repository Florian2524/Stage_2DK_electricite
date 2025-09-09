import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import CTA from '../components/CTA'
import Realisations from '../components/Realisations'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import Partners from '../components/Partners'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <section className="section bg-brand-mid">
          <div className="container-2dk">
            <Services />
          </div>
        </section>
        <CTA />
        <section className="section bg-brand-mid">
          <div className="container-2dk">
            <Realisations />
          </div>
        </section>
        <section className="section bg-brand-mid">
          <div className="container-2dk">
            <TestimonialsCarousel />
          </div>
        </section>
        <section className="section bg-brand-mid">
          <div className="container-2dk">
            <Partners />
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  )
}
