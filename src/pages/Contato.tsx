
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/ui/ContactForm";

const Contato = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white animate-fade-in">
      <Header />
      <div className="py-12">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default Contato;
