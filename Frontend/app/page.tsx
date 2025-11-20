import Hero from '../components/Hero';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import BookingForm from '../components/BookingForm';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main>
      <Hero />
      <Services />
      <BookingForm />
      <Gallery />
      <Footer/>
    </main>
  );
}
