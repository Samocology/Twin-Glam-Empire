
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "perfumes" | "bags" | "accessories";
  images: string[];
  featured?: boolean;
  inStock: boolean;
  newArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  createdAt: string;
  shippingAddress: string;
  phoneNumber?: string; // Add phoneNumber to match the UI in OrdersPage
}

export type Category = "perfumes" | "bags" | "accessories" | "all";
