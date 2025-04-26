
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Category } from "@/types";
import { getFeaturedProducts, getNewArrivals } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const newArrivals = getNewArrivals().slice(0, 3);
  
  const handleCategoryClick = (category: Category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="mb-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold leading-tight">
                Discover Luxury Accessories for Every Occasion
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore our exclusive collection of premium perfumes, elegant bags, and stunning hair accessories.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button size="lg" onClick={() => navigate("/products")}>
                  Shop Now
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/products/new-arrivals")}>
                  New Arrivals
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg bg-muted overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Featured Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-6 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg border border-border max-w-[200px]">
                <p className="text-sm text-muted-foreground">Featured Collection</p>
                <p className="text-xl font-playfair font-bold">Summer Elegance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-3">Browse Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated selection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Perfumes Category */}
          <Card 
            className="group relative h-80 overflow-hidden cursor-pointer"
            onClick={() => handleCategoryClick("perfumes")}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
            <img
              src="/placeholder.svg"
              alt="Perfumes"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
              <h3 className="text-2xl font-playfair font-bold text-white mb-2">Perfumes</h3>
              <p className="text-white/80 mb-4">
                Luxury fragrances for every occasion
              </p>
              <Button 
                variant="secondary" 
                className="group-hover:translate-x-2 transition-transform"
              >
                Explore <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </Card>

          {/* Bags Category */}
          <Card 
            className="group relative h-80 overflow-hidden cursor-pointer"
            onClick={() => handleCategoryClick("bags")}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
            <img
              src="/placeholder.svg"
              alt="Bags"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
              <h3 className="text-2xl font-playfair font-bold text-white mb-2">Bags</h3>
              <p className="text-white/80 mb-4">
                Elegant bags for every style
              </p>
              <Button 
                variant="secondary" 
                className="group-hover:translate-x-2 transition-transform"
              >
                Explore <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </Card>

          {/* Hair Accessories Category */}
          <Card 
            className="group relative h-80 overflow-hidden cursor-pointer"
            onClick={() => handleCategoryClick("accessories")}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
            <img
              src="/placeholder.svg"
              alt="Hair Accessories"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
              <h3 className="text-2xl font-playfair font-bold text-white mb-2">Hair Accessories</h3>
              <p className="text-white/80 mb-4">
                Beautiful accessories for your hair
              </p>
              <Button 
                variant="secondary" 
                className="group-hover:translate-x-2 transition-transform"
              >
                Explore <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                Handpicked by our curators
              </p>
            </div>
            <Button 
              variant="link" 
              className="mt-4 md:mt-0"
              onClick={() => navigate("/products")}
            >
              View All Products <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">
              The latest additions to our collection
            </p>
          </div>
          <Button 
            variant="link" 
            className="mt-4 md:mt-0"
            onClick={() => navigate("/products")}
          >
            View All Products <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-3">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover why our customers love shopping with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="p-6 border-primary/20">
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-amber-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "I absolutely love the quality of their perfumes. The fragrances last all day and always get me compliments. Shipping was fast too!"
              </p>
              <Separator className="mb-4" />
              <p className="font-medium">Amara Johnson</p>
              <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-6 border-primary/20">
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-amber-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "The Glamour Clutch is perfect for special occasions. It's sturdy, elegant, and just the right size. Customer service was also excellent."
              </p>
              <Separator className="mb-4" />
              <p className="font-medium">Chioma Okafor</p>
              <p className="text-sm text-muted-foreground">Abuja, Nigeria</p>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-6 border-primary/20">
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-amber-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "I've bought multiple hair accessories and I'm always impressed by the quality. The pearl hairpin set is my absolute favorite for special events."
              </p>
              <Separator className="mb-4" />
              <p className="font-medium">Ngozi Eze</p>
              <p className="text-sm text-muted-foreground">Port Harcourt, Nigeria</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-primary/10 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter to receive updates on new arrivals, special offers, and exclusive discounts.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
