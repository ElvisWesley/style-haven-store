import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl mb-4">Interior Haven</h3>
            <p className="text-sm text-gray-600">
              Curating exceptional interior products for your space.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-accent">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-accent">Contact</Link></li>
              <li><Link to="/shipping" className="text-sm hover:text-accent">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-sm hover:text-accent">Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-accent">Terms of Service</Link></li>
              <li><Link to="/sale-conditions" className="text-sm hover:text-accent">Conditions of Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: info@interiorhaven.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Design Street</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Interior Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;