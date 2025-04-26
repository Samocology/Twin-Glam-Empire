import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "perf-1",
    name: "Midnight Bloom",
    description: "A luxurious floral scent with notes of jasmine and vanilla. Perfect for evening occasions.",
    price: 8500,
    category: "perfumes",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
      "https://images.unsplash.com/photo-1541643600914-78b084683601"
    ],
    featured: true,
    inStock: true,
    newArrival: true,
  },
  {
    id: "perf-2",
    name: "Golden Elixir",
    description: "An elegant perfume with sweet and woody accords. Long-lasting fragrance for all-day wear.",
    price: 17500,
    category: "perfumes",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f"
    ],
    featured: false,
    inStock: true,
    newArrival: false,
  },
  {
    id: "perf-3",
    name: "BELLAVITA",
    description: "An elegant perfume with sweet and woody accords. Long-lasting fragrance for all-day wear.",
    price: 35000,
    category: "perfumes",
    images: [
      "https://i.ebayimg.com/images/g/~jkAAOSwO3Bm0uWN/s-l1600.webp",
      "https://i.ebayimg.com/images/g/LxoAAOSwMnBm0uWO/s-l960.webp",
      "https://i.ebayimg.com/images/g/nJMAAOSw3Uxm0uWO/s-l960.webp"
    ],
    featured: false,
    inStock: true,
    newArrival: false,
  },
  {
    id: "bag-1",
    name: "Elegance Tote",
    description: "A spacious and stylish tote bag perfect for everyday use. Made with premium leather.",
    price: 12000,
    category: "bags",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e"
    ],
    featured: true,
    inStock: true,
    newArrival: false,
  },
  {
    id: "bag-2",
    name: "Glamour Clutch",
    description: "A stunning evening clutch with gold-tone hardware. Perfect for special occasions.",
    price: 9500,
    category: "bags",
    images: [
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6",
      "https://images.unsplash.com/photo-1601924582970-9238bcb495d9"
    ],
    featured: false,
    inStock: true,
    newArrival: true,
  },
  {
    id: "bag-3",
    name: "Mateamoda Women Bag",
    description: "Mateamoda 3 PCS Women Bags Ladies Bags Handbags Purse Shoulder Bags.",
    price: 9500,
    category: "bags",
    images: [
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/32/545695/1.jpg?8564",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/32/545695/2.jpg?9730",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/32/545695/3.jpg?9730"
    ],
    featured: false,
    inStock: true,
    newArrival: true,
  },
  {
    id: "acc-1",
    name: "Pearl Hairpin Set",
    description: "Set of 3 elegant pearl hairpins. Add a touch of sophistication to any hairstyle.",
    price: 3500,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e",
      "https://images.unsplash.com/photo-1630006837255-96cd14f8a80a"
    ],
    featured: true,
    inStock: true,
    newArrival: true,
  },
  {
    id: "acc-2",
    name: "Hair Bands With Teeth",
    description: "A stunning crystal-embellished hair clip perfect for special occasions4pcs Women's Hairbands With Teeth Simple Fashion Versatile Hair Bands Hair Accessories Face Wash Headband.",
    price: 4200,
    category: "accessories",
    images: [
      "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/d0d66694252bfc10f4d440589ef7afec.jpg?imageView2/2/w/800/q/70/format/webp",
      "https://img-1.kwcdn.com/product/Fancyalgo/VirtualModelMatting/e00dc24eab73c7827835fabae558391d.jpg?imageView2/2/w/800/q/70/format/webp"
    ],
    featured: false,
    inStock: true,
    newArrival: false,
  },
  {
    id: "acc-3",
    name: "Wedding Hair Comb",
    description: "Wedding Hair Comb 1pc and Hair Pins 2pcs, Bride Hair Accessories Hair Side Comb Clips Flower Rhinestone Pearl Hair Clips for Bride Bridesmaid (3pcs set).",
    price: 4200,
    category: "accessories",
    images: [
      "https://m.media-amazon.com/images/I/817vWBiLvsL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71A4sZxP8KL._SL1500_.jpg"
    ],
    featured: false,
    inStock: true,
    newArrival: false,
  }
];


export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") {
    return products;
  }
  return products.filter(product => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getNewArrivals(): Product[] {
  return products.filter(product => product.newArrival);
}
