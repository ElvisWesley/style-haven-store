import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl mb-4">Interiør Haven</h3>
            <p className="text-sm text-gray-600">
              Vi kuraterer eksepsjonelle interiørprodukter for ditt rom.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Hurtiglenker</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-accent">Om oss</Link></li>
              <li><Link to="/shipping" className="text-sm hover:text-accent">Fraktinformasjon</Link></li>
              <li><Link to="/returns" className="text-sm hover:text-accent">Returer</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Juridisk</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm hover:text-accent">Personvern</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-accent">Vilkår for bruk</Link></li>
              <li><Link to="/sale-conditions" className="text-sm hover:text-accent">Salgsvilkår</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Kontakt oss</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>E-post: info@interiorhaven.com</li>
              <li>Telefon: +47 123 45 678</li>
              <li>Adresse: Designgata 123</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Interiør Haven. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;