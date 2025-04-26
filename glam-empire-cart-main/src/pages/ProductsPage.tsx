
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Category, Product } from "@/types";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const ProductsPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [showNewArrivals, setShowNewArrivals] = useState(false);

  useEffect(() => {
    const validCategory = category as Category || "all";
    const categoryProducts = getProductsByCategory(validCategory);
    setProducts(categoryProducts);
    setFilteredProducts(categoryProducts);
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by new arrivals if selected
    if (showNewArrivals) {
      filtered = filtered.filter((product) => product.newArrival);
    }

    // Sort products
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered = filtered.filter((product) => product.newArrival).concat(
        filtered.filter((product) => !product.newArrival)
      );
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, sortBy, showNewArrivals]);

  const handleCategoryChange = (newCategory: Category) => {
    navigate(`/products/${newCategory}`);
  };

  const formatPrice = (price: number) => {
    return `₦${(price / 100).toLocaleString()}`;
  };

  return (
    <div className="container px-4 py-8 mt-8 mb-16">
      <h1 className="text-3xl font-playfair font-bold mb-6 text-center">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              <Button
                variant={category === "all" || !category ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleCategoryChange("all")}
              >
                All Products
              </Button>
              <Button
                variant={category === "perfumes" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleCategoryChange("perfumes")}
              >
                Perfumes
              </Button>
              <Button
                variant={category === "bags" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleCategoryChange("bags")}
              >
                Bags
              </Button>
              <Button
                variant={category === "accessories" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleCategoryChange("accessories")}
              >
                Hair Accessories
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-3">Price Range</h3>
            <Slider
              defaultValue={priceRange}
              max={15000}
              step={500}
              value={priceRange}
              onValueChange={setPriceRange}
              className="my-6"
            />
            <div className="flex justify-between">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-3">Sort By</h3>
            <div className="space-y-2">
              <Button
                variant={sortBy === "default" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSortBy("default")}
              >
                Default
              </Button>
              <Button
                variant={sortBy === "price-asc" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSortBy("price-asc")}
              >
                Price: Low to High
              </Button>
              <Button
                variant={sortBy === "price-desc" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSortBy("price-desc")}
              >
                Price: High to Low
              </Button>
              <Button
                variant={sortBy === "newest" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSortBy("newest")}
              >
                Newest First
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center space-x-2">
            <Label htmlFor="new-arrivals">Show New Arrivals Only</Label>
            <input
              id="new-arrivals"
              type="checkbox"
              checked={showNewArrivals}
              onChange={(e) => setShowNewArrivals(e.target.checked)}
              className="h-4 w-4"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters to see more products.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
