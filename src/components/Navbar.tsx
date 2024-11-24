import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, User, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.querySelector('footer');
    footer?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif">
            Interior Haven
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </form>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              <Link to="/category/tables" className="hover:text-accent">Tables</Link>
              <Link to="/category/lanterns" className="hover:text-accent">Lanterns</Link>
              <Link to="/category/wall-fireplaces" className="hover:text-accent">Wall Fireplaces</Link>
              <Link to="/category/floor-fireplaces" className="hover:text-accent">Floor Fireplaces</Link>
            </div>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center space-x-8">
              <Link to="/about" className="hover:text-accent">About</Link>
              <a href="#contact" onClick={scrollToContact} className="hover:text-accent">Contact</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                  {user.is_admin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}

            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <form onSubmit={handleSearch} className="p-2">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </form>
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
                    <a href="#contact" onClick={scrollToContact}>Contact</a>
                  </DropdownMenuItem>
                  {!user && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/signin">Sign In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/signup">Sign Up</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user && (
                    <>
                      {user.is_admin && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin">Admin Dashboard</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => signOut()}>
                        Sign Out
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Link to="/cart" className="relative p-2 hover:text-accent">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;