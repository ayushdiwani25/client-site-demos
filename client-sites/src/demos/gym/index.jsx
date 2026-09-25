import ContactForm from '../../shared/components/ContactForm'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import { WHATSAPP } from './data'
import Bmi from './sections/Bmi'
import Hero from './sections/Hero'
import Plans from './sections/Plans'
import Timetable from './sections/Timetable'
import Trainers from './sections/Trainers'
import { inner } from './theme'

export default function Gym() {
  return (
    <div id="top">
      <Navbar brand="Stride" links={[['Timetable', '#schedule'], ['Plans', '#plans'], ['Coaches', '#coaches']]} cta={['Free trial', '#contact']} />
      <Hero />
      <Timetable />
      <Plans />
      <Trainers />
      <Bmi />
      <section id="contact" className="bg-court py-20 text-white">
        <div className={`${inner} grid gap-10 md:grid-cols-2`}>
          <div>
            <h2 className="font-display text-4xl font-extrabold">Try a class on us</h2>
            <p className="mt-3 max-w-sm text-white/80">Tell us your goal and we will message you the best class to start with.</p>
          </div>
          <div className="rounded-2xl bg-chalk p-6 text-ink">
            <ContactForm number={WHATSAPP} goals={['Build strength', 'Lose fat', 'Improve mobility', 'Just get started']} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
