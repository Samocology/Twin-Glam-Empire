
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and About */}
          <div className="md:col-span-1">
            <h3 className="font-playfair text-2xl font-bold mb-4">Twin Glam Empire</h3>
            <p className="text-muted-foreground mb-4">
              Your destination for premium perfumes, elegant bags, and beautiful hair accessories.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Shop All</Link>
              <Link to="/products/perfumes" className="text-muted-foreground hover:text-primary transition-colors">Perfumes</Link>
              <Link to="/products/bags" className="text-muted-foreground hover:text-primary transition-colors">Bags</Link>
              <Link to="/products/accessories" className="text-muted-foreground hover:text-primary transition-colors">Hair Accessories</Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-medium text-lg mb-4">Customer Service</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
              <Link to="/orders" className="text-muted-foreground hover:text-primary transition-colors">Track Order</Link>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contact Us</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>123 Fashion Street</p>
              <p>Lagos, Nigeria</p>
              <p>Phone: +234 (0) 800 456 7890</p>
              <p>Email: support@twinglam.com</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Twin Glam Empire. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
