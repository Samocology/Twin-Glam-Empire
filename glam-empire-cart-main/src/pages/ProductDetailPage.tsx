
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = productId ? getProductById(productId) : undefined;

  // If product not found, redirect to products page
  useEffect(() => {
    if (!product && productId) {
      navigate("/products");
    }
  }, [product, productId, navigate]);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-playfair">Product not found</h2>
        <Button onClick={() => navigate("/products")} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  // Format the price in Naira
  const formattedPrice = `₦${(product.price / 100).toLocaleString()}`;

  return (
    <div className="container py-12 px-4 mt-8 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-muted rounded-lg overflow-hidden shadow-sm">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover aspect-square"
          />
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-playfair font-bold">{product.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">{formattedPrice}</span>
            {product.newArrival && (
              <span className="bg-primary/10 text-primary px-2 py-1 text-sm font-medium rounded">
                New Arrival
              </span>
            )}
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>
                {product.inStock
                  ? "In Stock - Ready to Ship"
                  : "Out of Stock"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Free delivery within Lagos. Delivery to other states may incur
              additional charges.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={handleWishlist}
            >
              <Heart
                size={18}
                className={cn(
                  "mr-2",
                  isInWishlist(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-current"
                )}
              />
              {isInWishlist(product.id) ? "Saved" : "Save for Later"}
            </Button>
          </div>

          <div className="border-t border-border pt-6 mt-6">
            <h3 className="font-medium mb-2">Product Details</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Category:</span>{" "}
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </li>
              <li>
                <span className="text-muted-foreground">Product ID:</span>{" "}
                {product.id}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
