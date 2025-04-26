
import { Product } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Format the price in Naira with ₦ symbol
  const formattedPrice = `₦${Number(product.price / 100).toLocaleString('en-NG')}`;

  return (
    <div
      className="group rounded-lg overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* New Arrival Badge */}
        {product.newArrival && (
          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs font-medium rounded">
            New Arrival
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm"
        >
          <Heart
            size={18}
            className={cn(
              "transition-colors",
              isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-lg">{formattedPrice}</span>
          <Button size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
