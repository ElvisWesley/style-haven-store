import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-4xl font-serif mb-8">Om Interiør Haven</h1>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-accent">Vår Historie</h2>
            <p className="text-gray-600 leading-relaxed">
              Grunnlagt med en lidenskap for eksepsjonell interiørdesign, har Interiør Haven blitt en betrodd destinasjon for de som ønsker å forvandle sine boområder. Vi kuraterer nøye vår kolleksjon for å gi deg det fineste innen møbler og interiør.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-accent">Vår Misjon</h2>
            <p className="text-gray-600 leading-relaxed">
              Vi tror at hvert hjem forteller en historie, og vår misjon er å hjelpe deg med å fortelle din gjennom nøye utvalgte stykker som gjenspeiler din personlige stil. Vår forpliktelse til kvalitet, design og kundetilfredshet driver alt vi gjør.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-accent">Kvalitet & Håndverk</h2>
            <p className="text-gray-600 leading-relaxed">
              Hvert stykke i vår kolleksjon er valgt for sin eksepsjonelle kvalitet og håndverk. Vi samarbeider med dyktige håndverkere og anerkjente produsenter som deler vår dedikasjon til å skape møbler og interiør som tåler tidens tann.
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl">Kuratert Utvalg</h3>
              <p className="text-gray-600">Nøye utvalgte stykker for enhver stil og rom</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl">Ekspert Støtte</h3>
              <p className="text-gray-600">Dedikert team for å hjelpe med dine designbehov</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl">Kvalitetsgaranti</h3>
              <p className="text-gray-600">Premium materialer og ekspert håndverk</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;