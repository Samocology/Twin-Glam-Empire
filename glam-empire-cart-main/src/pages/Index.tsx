
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { getProductsByCategory, getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const Index = () => {
  const { isAuthenticated, isSupabaseConfigured } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  // Get sections for perfumes, bags, accessories, top sale
  const perfumes = getProductsByCategory("perfumes");
  const bags = getProductsByCategory("bags");
  const accessories = getProductsByCategory("accessories");
  const featured = getFeaturedProducts();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-3xl w-full text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Twin Glam Empire
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive collection of premium perfumes, elegant bags, and stunning hair accessories.
          </p>
          
          {!isSupabaseConfigured && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 my-6 text-left">
              <h3 className="text-amber-800 font-medium text-sm sm:text-base">Supabase Not Configured</h3>
              <p className="text-amber-700 text-sm mt-1">
                Authentication and database features will not work until you connect your project to Supabase.
                Click the Supabase button in the top right corner to connect.
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user UI (show products/categories, top, wishlist, cart sections)
  return (
    <div className="container mx-auto px-4 py-12 mb-16 space-y-12">
      {/* Top Sale (Featured) Section */}
      <section>
        <h2 className="text-3xl font-bold font-playfair mb-6">Top Sale</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.length === 0 ? (
            <p className="text-muted-foreground">No featured products right now.</p>
          ) : (
            featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* Perfumes */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-playfair">Perfumes</h2>
          <Button
            variant="link"
            onClick={() => navigate("/products/perfumes")}
          >
            See all Perfumes
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {perfumes.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bags */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-playfair">Bags</h2>
          <Button
            variant="link"
            onClick={() => navigate("/products/bags")}
          >
            See all Bags
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bags.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Hair Accessories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-playfair">Hair Accessories</h2>
          <Button
            variant="link"
            onClick={() => navigate("/products/accessories")}
          >
            See all Accessories
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {accessories.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Wishlist Preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-playfair">Your Wishlist</h2>
          <Button
            variant="link"
            onClick={() => navigate("/wishlist")}
          >
            Go to Wishlist
          </Button>
        </div>
        {wishlistItems.length === 0 ? (
          <p className="text-muted-foreground mb-2">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlistItems.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Cart Preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-playfair">Cart</h2>
          <Button
            variant="link"
            onClick={() => navigate("/cart")}
          >
            Go to Cart
          </Button>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cartItems.slice(0, 3).map(item => (
              <ProductCard key={item.product.id} product={item.product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
