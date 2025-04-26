import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types";
import { supabase } from "@/integrations/supabase/client";

const OrdersPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    async function fetchOrders() {
      if (!user?.id) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } else {
        // Process the data to match our Order type
        const processedOrders: Order[] = data.map((order: any) => ({
          id: order.id,
          userId: order.user_id,
          items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
          total: order.total,
          status: order.status,
          createdAt: order.created_at,
          shippingAddress: order.shipping_address,
          phoneNumber: order.phone_number,
        }));
        
        setOrders(processedOrders);
        console.log("Fetched orders:", processedOrders);
      }
      setLoading(false);
    }
    
    fetchOrders();
  }, [isAuthenticated, navigate, user]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 100).toLocaleString()}`;
  };

  const getStatusBadgeClass = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container px-4 py-8 mt-8 mb-16">
      <h1 className="text-3xl font-playfair font-bold mb-6">Your Orders</h1>
      {loading ? (
        <div className="text-center py-12">
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <h2 className="text-2xl font-medium mb-4">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet.
          </p>
          <Button onClick={() => navigate("/products")}>
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>
                      Placed on {formatDate(order.createdAt)}
                    </CardDescription>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order.id}-${item.product.id}-${index}`}
                      className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 pb-4 border-b last:border-0"
                    >
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Shipping Address:</span>
                      <span className="text-right">{order.shippingAddress}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Phone Number:</span>
                      <span className="text-right">{order.phoneNumber || "—"}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Amount:</span>
                      <span>{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                  {order.status === "delivered" && (
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Leave a Review
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
