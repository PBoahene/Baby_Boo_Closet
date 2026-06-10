import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MapPin, Smartphone, Wallet } from "lucide-react";
import { toast } from "sonner";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number required"),
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  postalCode: z.string().min(2, "Postal code required"),
  region: z.string().min(2, "Region required"),
  paymentMethod: z.enum(["mtn", "vodafone", "airteltigo", "bank"], { errorMap: () => ({ message: "Select payment method" }) }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      region: "",
      paymentMethod: "mtn",
    },
  });

  // Mock cart items
  const cartItems = [
    { id: 1, name: "School Uniform Set", price: 89.99, quantity: 2, image: "/placeholder.jpg" },
    { id: 2, name: "Kids Underwear Pack", price: 34.99, quantity: 1, image: "/placeholder.jpg" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const onSubmit = async (values: CheckoutFormValues) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Process payment with selected payment method
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          items: cartItems,
          total,
        }),
      });

      if (!response.ok) throw new Error("Checkout failed");

      toast.success("Order placed successfully!");
      navigate("/checkout/success");
    } catch (error) {
      toast.error("Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-black pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Checkout</h1>
          <div className="flex gap-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                  currentStep === step ? "border-primary text-primary" : "border-white/10 text-gray-400"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= step ? "bg-primary text-black" : "bg-white/10 text-white"
                }`}>
                  {currentStep > step ? <CheckCircle2 className="h-4 w-4" /> : step}
                </div>
                <span className="text-sm">
                  {step === 1 && "Shipping"}
                  {step === 2 && "Payment"}
                  {step === 3 && "Review"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Shipping */}
                {currentStep === 1 && (
                  <Card className="border-white/10 bg-card/90">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Shipping Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+233..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main Street" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Accra" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="region"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Region</FormLabel>
                              <FormControl>
                                <Input placeholder="Greater Accra" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="00100" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button onClick={() => setCurrentStep(2)} size="lg">
                          Continue to Payment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Payment */}
                {currentStep === 2 && (
                  <Card className="border-white/10 bg-card/90">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup value={field.value} onValueChange={field.onChange}>
                                <div className="space-y-3">
                                  {[
                                    { id: "mtn", label: "MTN Mobile Money", icon: "📱" },
                                    { id: "vodafone", label: "Vodafone Cash", icon: "💳" },
                                    { id: "airteltigo", label: "AirtelTigo Money", icon: "🏦" },
                                    { id: "bank", label: "Bank Transfer", icon: "🏛️" },
                                  ].map((method) => (
                                    <div
                                      key={method.id}
                                      className="flex items-center space-x-2 p-3 rounded-lg border border-white/10 hover:border-primary/50 cursor-pointer transition-colors"
                                    >
                                      <RadioGroupItem value={method.id} id={method.id} />
                                      <label htmlFor={method.id} className="flex-1 cursor-pointer flex items-center gap-2">
                                        <span>{method.icon}</span>
                                        <span className="text-white">{method.label}</span>
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={() => setCurrentStep(1)} size="lg">
                          Back
                        </Button>
                        <Button onClick={() => setCurrentStep(3)} size="lg">
                          Review Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <Card className="border-white/10 bg-card/90">
                    <CardHeader>
                      <CardTitle>Review Your Order</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-black/40 rounded-lg space-y-3">
                        <h3 className="font-semibold text-white">Shipping To:</h3>
                        <p className="text-sm text-gray-400">
                          {form.getValues("firstName")} {form.getValues("lastName")}<br />
                          {form.getValues("address")}<br />
                          {form.getValues("city")}, {form.getValues("region")}<br />
                          {form.getValues("phone")}
                        </p>
                      </div>

                      <p className="text-sm text-gray-400">
                        <strong>Payment Method:</strong> {form.getValues("paymentMethod").toUpperCase()}
                      </p>

                      <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={() => setCurrentStep(2)} size="lg">
                          Back
                        </Button>
                        <Button
                          onClick={form.handleSubmit(onSubmit)}
                          disabled={isProcessing}
                          size="lg"
                        >
                          {isProcessing ? "Processing..." : "Place Order"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-white/10 bg-card/90 sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm pb-2 border-b border-white/10">
                      <div>
                        <p className="text-white">{item.name}</p>
                        <p className="text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white font-semibold">₵{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">₵{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white">{shipping === 0 ? "Free" : `₵${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-white">₵{tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-primary">₵{total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping === 0 && (
                  <Badge className="w-full justify-center py-2">Free Shipping Applied</Badge>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
