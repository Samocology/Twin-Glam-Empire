
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  
  const cartItemCount = getTotalItems();
  const wishlistItemCount = wishlistItems.length;
  
  const navItems = [
    {
      label: "Home",
      icon: Home,
      path: "/",
      active: location.pathname === "/",
    },
    {
      label: "Search",
      icon: Search,
      path: "/products",
      active: location.pathname.includes("/products"),
    },
    {
      label: "Cart",
      icon: ShoppingCart,
      path: "/cart",
      active: location.pathname === "/cart",
      badge: cartItemCount > 0 ? cartItemCount : undefined,
    },
    {
      label: "Wishlist",
      icon: Heart,
      path: "/wishlist",
      active: location.pathname === "/wishlist",
      badge: wishlistItemCount > 0 ? wishlistItemCount : undefined,
    },
    {
      label: "Account",
      icon: User,
      path: isAuthenticated ? "/account" : "/login",
      active: location.pathname === "/account" || location.pathname === "/login" || location.pathname === "/register",
    },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 sm:px-4 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex flex-1 flex-col items-center justify-center h-full group"
            onClick={() => navigate(item.path)}
          >
            <div className="relative inline-flex">
              <item.icon
                size={24}
                className={cn(
                  "transition-colors",
                  item.active
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              
              {item.badge && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </div>
            
            <span
              className={cn(
                "text-[10px] mt-1",
                item.active
                  ? "text-primary font-medium"
                  : "text-muted-foreground group-hover:text-foreground"
              )}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
