import React from "react";

const CheckoutSuccess = () => {
  return (
    <main className="min-h-screen container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you! Your order has been placed.</h1>
      <p className="text-muted-foreground mb-2">
        We received your order details and our admin team will contact you soon.
      </p>
      <p className="text-muted-foreground">
        Please keep your phone and email available so we can arrange payment and delivery.
      </p>
    </main>
  );
};

export default CheckoutSuccess;
