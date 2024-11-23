import { Link } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif">
            Interior Haven
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/category/tables" className="hover:text-accent">Tables</Link>
            <Link to="/category/lanterns" className="hover:text-accent">Lanterns</Link>
            <Link to="/category/wall-fireplaces" className="hover:text-accent">Wall Fireplaces</Link>
            <Link to="/category/floor-fireplaces" className="hover:text-accent">Floor Fireplaces</Link>
            <Link to="/about" className="hover:text-accent">About</Link>
            <Link to="/contact" className="hover:text-accent">Contact</Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/category/tables">Tables</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/lanterns">Lanterns</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/wall-fireplaces">Wall Fireplaces</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/floor-fireplaces">Floor Fireplaces</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact">Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link to="/cart" className="p-2 hover:text-accent">
            <ShoppingCart className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;