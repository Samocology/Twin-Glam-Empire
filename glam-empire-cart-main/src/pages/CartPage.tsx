
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, Minus, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [deliveryAddress, setDeliveryAddress] = useState("3,Olu-Ajilo, Isolo");
  const [phoneNumber, setPhoneNumber] = useState("+234 903 463 3896");
  const [showCheckout, setShowCheckout] = useState(false);
  
  const handleUpdateQuantity = (productId: string, amount: number, currentQty: number) => {
    const newQuantity = currentQty + amount;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to continue with checkout.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add some products first.",
        variant: "destructive",
      });
      return;
    }
    
    setShowCheckout(true);
  };
  
  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim() || !phoneNumber.trim()) {
      toast({
        title: "Details Required",
        description: "Please provide both your delivery address and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!user || !user.id) {
      toast({
        title: "Authentication Error",
        description: "Please login again to continue.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const order = {
      user_id: user.id,
      items: JSON.stringify(items),
      total,
      shipping_address: deliveryAddress,
      phone_number: phoneNumber,
      status: "pending",
    };

    const { error } = await supabase
      .from("orders")
      .insert(order);
      
    if (error) {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
      console.error("Order insertion error:", error);
      return;
    }

    try {
      console.log("Sending order email with data:", {
        address: deliveryAddress,
        phone: phoneNumber,
        cart: items,
        total
      });
      
      const response = await fetch(
        `https://hxemmzkjxqilfzrrevrl.supabase.co/functions/v1/send-order-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: deliveryAddress,
            phone: phoneNumber,
            cart: items,
            total,
          }),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to send email: ${errorData.error || response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Email sending response:", data);
      
      toast({ 
        title: "Order Placed Successfully!", 
        description: "We'll contact you shortly." 
      });
    } catch (e) {
      console.error("Email sending error:", e);
      toast({ 
        title: "Order Placed, but email notification failed", 
        description: "Your order was recorded but we couldn't send the confirmation email.",
        variant: "destructive" 
      });
    }

    clearCart();
    setShowCheckout(false);
    navigate("/orders");
  };
  
  const formatCurrency = (amount: number) => {
    return `₦${(amount / 100).toLocaleString()}`;
  };
  
  const subtotal = getTotal();
  const deliveryFee = items.length > 0 ? 1000 : 0;
  const total = subtotal + deliveryFee;
  
  return (
    <div className="container px-4 py-8 mt-8 mb-16">
      <h1 className="text-3xl font-playfair font-bold mb-6">Your Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some products to your cart to see them here.
          </p>
          <Button onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 bg-white p-4 rounded-lg border border-border">
                  <div className="sm:w-24 sm:h-24 aspect-square rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 sm:ml-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                          {item.product.description}
                        </p>
                        <span className="font-bold">
                          {formatCurrency(item.product.price)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-between mt-3 sm:mt-0">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.product.id, -1, item.quantity)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.product.id, 1, item.quantity)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive mt-2"
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
                          <Trash2 size={16} className="mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-playfair font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              
              {!showCheckout ? (
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Information</h4>
                  <Textarea
                    placeholder="Enter your delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="resize-none"
                    rows={3}
                  />
                  <Input
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Payment Method: <span className="font-medium">Pay on Delivery</span>
                  </p>
                  <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                    <Check size={18} className="mr-2" /> Place Order
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowCheckout(false)}
                  >
                    Back to Cart
                  </Button>
                </div>
              )}
              
              <Button
                variant="link"
                className="w-full mt-4"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
