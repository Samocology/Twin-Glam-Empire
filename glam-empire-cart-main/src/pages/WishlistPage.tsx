
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";

const WishlistPage = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (productId: string) => {
    const product = items.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
    }
  };

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 100).toLocaleString()}`;
  };

  return (
    <div className="container px-4 py-8 mt-8 mb-16">
      <h1 className="text-3xl font-playfair font-bold mb-6">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add products to your wishlist to save them for later.
          </p>
          <Button onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div 
              key={product.id} 
              className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-all"
            >
              <div 
                className="aspect-square bg-muted cursor-pointer" 
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <div onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="font-bold text-lg mb-4">
                    {formatCurrency(product.price)}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
