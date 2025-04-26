
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { address, phone, cart, total } = await req.json();
    
    // Parse the cart items if they're stored as a JSON string
    const parsedCart = typeof cart === 'string' ? JSON.parse(cart) : cart;
    
    let productsText = parsedCart.map((item: any) => {
      return `- ${item.product.name} (x${item.quantity}) — ₦${(item.product.price * item.quantity / 100).toLocaleString()}`;
    }).join("<br>");

    // Format the phone number properly
    const formattedPhone = phone || 'Not provided';

    const orderBody = `
      <h2>New Order Received</h2>
      <p><strong>Phone:</strong> ${formattedPhone}</p>
      <p><strong>Shipping Address:</strong> ${address || 'Not provided'}</p>
      <p><strong>Products:</strong><br>${productsText}</p>
      <p><strong>Total:</strong> ₦${(total/100).toLocaleString()}</p>
    `;

    console.log("Sending email with order details:", { address, phone, total, items: parsedCart.length });

    const emailResponse = await resend.emails.send({
      from: "Twin Glam Empire <onboarding@resend.dev>",
      to: ["twinglamempire@gmail.com"],
      subject: "New Order Received",
      html: orderBody,
    });

    console.log("Email response:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (e: any) {
    console.error("Error sending email:", e.message);
    return new Response(
      JSON.stringify({ error: e.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
