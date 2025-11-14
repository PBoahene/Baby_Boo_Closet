import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const CheckoutSuccess = () => {
  const [params] = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const s = params.get("session_id") || params.get("sessionId") || null;
    setSessionId(s);
  }, [params]);

  return (
    <main className="min-h-screen container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you — your order is on its way!</h1>
      <p className="text-muted-foreground mb-6">We received your order and will email a confirmation shortly.</p>
      {sessionId && (
        <div className="text-sm text-muted-foreground">Session: {sessionId}</div>
      )}
    </main>
  );
};

export default CheckoutSuccess;
